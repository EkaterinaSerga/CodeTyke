import React from 'react';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import ProgressBar from '../progressBar/ProgressBar';
import Modal from '../modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Styles.scss';

const LearningModule = ({ setGameStatus }) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [showLoader, setShowLoader] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [answerSelected, setAnswerSelected] = React.useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = React.useState(-1);
  const [correctAnswer, setCorrectAnswer] = React.useState(undefined);
  const [correctAnswersNum, setCorrectAnswersNum] = React.useState(1);

  let currentQuestion = quizData.questionArr
    ? quizData.questionArr[currentQuestionId]
    : {};
  React.useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = () => {
    fetch('http://localhost:8080/problems')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuizData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkAnswer = (answer) => {
    if (answer.isCorrect && !correctAnswersNum) {
      setCorrectAnswer(true);
      alert('Correct');
      setSelectedAnswerId(-1);
      setAnswerSelected(false);
      return true;
    } else if (answer.isCorrect && correctAnswersNum) {
      setCorrectAnswer(undefined);
      alert('Not all');
      return undefined;
    } else {
      setCorrectAnswer(false);
      alert('Try again');
      return false;
    }
  };

  const handleSubmit = () => {
    if (currentQuestionId < quizData.totalQuestions - 1) {
      setShowLoader(true);
      setTimeout(function () {
        const correct = checkAnswer(
          currentQuestion.possibleAnswers[selectedAnswerId]
        );
        if (correct) {
          setCurrentQuestionId(currentQuestionId + 1);
        }
        setShowLoader(false);
      }, 500);
    } else {
      setCurrentQuestionId(0);
      setGameStatus({ message: 'Great Job! Play again.', loadIntro: true });
    }
  };
  let possibleAnswers = [];
  if (currentQuestion.possibleAnswers) {
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return (
        <SelectionBox
          id={index}
          key={index}
          answer={answer}
          selectAnswer={setAnswerSelected}
          answerSelected={answerSelected}
          selectedAnswerId={selectedAnswerId}
          setSelectedAnswerId={setSelectedAnswerId}
          setCorrectAnswersNum={setCorrectAnswersNum}
          correctAnswersNum={correctAnswersNum}
        />
      );
    });
  }

  const toggleAdditionalInfo = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="learningModule">
      {currentQuestion.title && (
        <>
          <div
            className="learningModule--overlay"
            onClick={toggleAdditionalInfo}
            style={{ display: showModal ? 'block' : 'none' }}
          ></div>
          <Modal showModal={showModal} setShowModal={setShowModal}>
            {currentQuestion.additionalInfo}
          </Modal>
          <ProgressBar
            totalQuestions={quizData.totalQuestions}
            id={currentQuestion.id}
          />
          <div className="learningModule--header">
            <div className="learningModule--title">{currentQuestion.title}</div>
            <div className="learningModule--additionalInfoIcon">
              <FontAwesomeIcon
                icon={faInfoCircle}
                onClick={toggleAdditionalInfo}
                size="lg"
              />
            </div>
            <div className="learningModule--subHeader">
              {currentQuestion.additionalInfo}
            </div>
          </div>

          <div className="learningModule--answerArea">
            <div className="learningModule--selections">{possibleAnswers}</div>
            <div className="learningModule--submitButtonContainer">
              <Button
                label="Submit"
                handleSubmit={handleSubmit}
                showLoader={showLoader}
                hasIcons
                answerSelected={answerSelected}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LearningModule;
