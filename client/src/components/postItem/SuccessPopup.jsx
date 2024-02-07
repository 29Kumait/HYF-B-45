// SuccessPopup.jsx
import React from "react";
import "./SuccessPopup.css";
import PropTypes from "prop-types";

const SuccessPopup = ({ onClose }) => {
  return (
    <div className="success-popup">
      <p>
        <span role="img" aria-label="check-mark">
          ✅
        </span>{" "}
        Item added successfully!
      </p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

SuccessPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SuccessPopup;
