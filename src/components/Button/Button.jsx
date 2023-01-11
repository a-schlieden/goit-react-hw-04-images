import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';


export const Button = ({ onBtnClick }) => {
  return (
    <button
      type="button"
      onClick={onBtnClick}
      className={style.Button}
    >
      Load More
    </button>
  );

}


Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};