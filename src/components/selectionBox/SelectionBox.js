import React from 'react';

import styles from './Styles.scss';

const SelectionBox = (props) => {
  const [id, setSelectedId] = React.useState(-1);

  const handleClick = () => {
    props.selectAnswer(!props.answerSelected);
    setSelectedId(id === -1 ? props.id : -1);
  };

  return (
    <div
      className="selectionBox"
      id={'selectionBox' + props.id}
      style={{
        backgroundColor: id === props.id ? styles.grassBlade : 'white',
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
