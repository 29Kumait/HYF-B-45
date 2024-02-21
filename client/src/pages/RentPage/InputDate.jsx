import React, { useState } from "react";
import PropTypes from "prop-types";
import "./rentStyle.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDate = ({
  handleStartDateChange,
  handleEndDateChange,
  // unavailableDates,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateInput = (date) => {
    setStartDate(date);
    handleStartDateChange(date);
  };

  const handleEndDateInput = (date) => {
    setEndDate(date);
    handleEndDateChange(date);
  };

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleStartDateInput(date)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => handleEndDateInput(date)}
        />
      </div>
    </div>
  );
};
InputDate.propTypes = {
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  unavailableDates: PropTypes.array.isRequired,
};
export default InputDate;
