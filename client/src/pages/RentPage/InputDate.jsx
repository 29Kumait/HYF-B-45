import React, { useState } from "react";
import PropTypes from "prop-types";

const InputDate = ({ handleStartDateChange, handleEndDateChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateInput = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);
    handleStartDateChange(selectedStartDate);
  };

  const handleEndDateInput = (e) => {
    const selectedEndDate = e.target.value;
    setEndDate(selectedEndDate);
    handleEndDateChange(selectedEndDate);
  };

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={handleStartDateInput} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={handleEndDateInput} />
      </div>
    </div>
  );
};
InputDate.propTypes = {
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
};
export default InputDate;
