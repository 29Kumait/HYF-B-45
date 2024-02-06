import React from "react";
import PropTypes from "prop-types";
import MotionButton from "./MotionButton.jsx";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {children}
        <MotionButton text={"🅧"} onClick={onClose} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
