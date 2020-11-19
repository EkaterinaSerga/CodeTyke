import React from 'react';

import styles from './Styles.scss';

const SelectionBox = (props) => {
  const handleClick = () => {
    props.selectAnswer(!props.answerSelected);
    props.setSelectedAnswerId(props.selectedAnswerId === -1 ? props.id : -1);
    props.setCorrectAnswersNum(props.correctAnswersNum - 1);
  };

  return (
    <div
      className="selectionBox"
      id={'selectionBox' + props.id}
      style={{
        backgroundColor:
          props.selectedAnswerId === props.id ? styles.morningSky : 'white',
      }}
    >
      <img
        className="selectionBox--image"
        alt={props.answer.imageAlt}
        src={props.answer.image}
      />
      <input
        className="selectionBox--checkbox"
        type="checkbox"
        onClick={handleClick}
      />
      <span className="selectionBox--text">{props.answer.text}</span>
    </div>
  );
};

export default SelectionBox;
