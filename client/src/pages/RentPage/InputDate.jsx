import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { logInfo, logError } from "../../../../server/src/util/logging";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDate = ({
  handleStartDateChange,
  handleEndDateChange,
  itemId,
  rentPageLoading,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isRentPageLoaded, setIsRentPageLoaded] = useState(false);

  const { error, performFetch, cancelFetch } = useFetch(
    `/transactions/rentPage/${itemId}`,
    (response) => {
      logInfo("API Result:", response.result);
      setIsRentPageLoaded(rentPageLoading);
      if (response.success) {
        logInfo(response.result);
      } else {
        logError("Error fetching unavailable dates:", error);
      }
    }
  );
  useEffect(() => {
    if (isRentPageLoaded) {
      performFetch();
    }
    return cancelFetch;
  }, [isRentPageLoaded, performFetch, cancelFetch]);

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
  itemId: PropTypes.string.isRequired,
  rentPageLoading: PropTypes.bool.isRequired,
};
export default InputDate;
