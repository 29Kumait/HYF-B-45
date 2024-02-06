import React from "react";
import PropTypes from "prop-types";
import "./Style.css";

const MotionButton = ({ text, onClick }) => {
  return (
    <button className="button-glow" onClick={onClick}>
      {text}
    </button>
  );
};

MotionButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MotionButton;
