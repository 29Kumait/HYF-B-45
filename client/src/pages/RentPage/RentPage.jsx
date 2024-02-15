import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DepositPrice from "./DepositPrice";
import InputDate from "./InputDate";
import "./rentStyle.css";
import useFetch from "../../hooks/useFetch";
import { logError } from "../../../../server/src/util/logging";
import Header from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

function RentPage() {
  const { itemId } = useParams();
  const [rentalStatus, setRentalStatus] = useState("");
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [renterId, setRenterId] = useState("");
  const [days, setDays] = useState(1); // Default value is 1 day

  const { isLoading, performFetch } = useFetch(
    `/transactions/rentPage/${itemId}`,
    (result) => {
      if (result.success) {
        setRentalStatus("Rental transaction successful");
      } else {
        setError("Error renting item. Please try again later.");
        logError("Error renting item:", result.error);
      }
    }
  );

  const handleStartDateChange = (selectedStartDate) => {
    setStartDate(selectedStartDate);
  };

  const handleEndDateChange = (selectedEndDate) => {
    setEndDate(selectedEndDate);
    // Calculate number of days between start and end dates
    const start = new Date(startDate);
    const end = new Date(selectedEndDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  };

  const handleRentItem = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    // Validate that end date is after start date
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      setError("End date must be after start date.");
      return;
    }
    try {
      await performFetch({
        method: "POST",
        body: JSON.stringify({
          startDate,
          endDate,
          price,
          renterId,
        }),
      });
    } catch (error) {
      setError("Error renting item. Please try again later.");
      logError("Error renting item:", error);
    }
  };

  return (
    <>
      {" "}
      <Header />
      <div className="pricey">
        <InputDate
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />
        <DepositPrice
          itemId={itemId}
          setRenterId={setRenterId}
          setTotalPrice={setPrice}
          days={days}
        />
        <button onClick={handleRentItem}>Rent Item</button>
        <p>{rentalStatus}</p>
        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </div>
      <Footer />
    </>
  );
}

export default RentPage;
