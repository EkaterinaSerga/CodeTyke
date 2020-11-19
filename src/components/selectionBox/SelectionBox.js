import React from 'react';

import styles from './Styles.scss';

const SelectionBox = (props) => {
  const [selected, setSelected] = React.useState({ status: false, id: -1 });

  const handleClick = (event) => {
    console.log('i fired');
    setSelected({
      status: !selected.status,
      id: selected.id === -1 ? props.id : -1,
    });
  };

  return (
    <div
      className="selectionBox"
      id={'selectionBox' + props.id}
      style={{
        backgroundColor: selected.id === props.id ? styles.grassBlade : 'white',
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
