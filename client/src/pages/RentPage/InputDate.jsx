import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { logInfo, logError } from "../../../../server/src/util/logging";
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
  itemId: PropTypes.string.isRequired,
  rentPageLoading: PropTypes.bool.isRequired,
};
export default InputDate;
