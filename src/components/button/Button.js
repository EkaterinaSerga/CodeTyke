import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import styles from './Styles.scss';

const Button = (props) => {
  return (
    <div
      className={'submitButton ' + (props.hasIcons && 'hasIcons')}
      onClick={
        props.hasIcons
          ? props.answerSelected
            ? props.handleSubmit
            : undefined
          : props.handleSubmit
      }
      style={{
        backgroundColor: props.hasIcons
          ? props.answerSelected
            ? styles.grassBlade
            : styles.elephantPaw
          : styles.barney,
      }}
    >
      <div className="placeholder"></div>
      <div className="submitButton--label">{props.label}</div>
      <div className="icon">
        {props.showLoader && (
          <FontAwesomeIcon icon={faSync} className="spinningLoader" />
        )}
      </div>
    </div>
  );
};

export default Button;
