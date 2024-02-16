import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DepositPrice from "./DepositPrice";
import InputDate from "./InputDate";
import "./rentStyle.css";
import useFetch from "../../hooks/useFetch";
import { logError, logInfo } from "../../../../server/src/util/logging";
import Header from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { Checkout } from "../CheckoutPage/Checkout";
import { useAuth } from "../../components/Account/AuthContext";

const RentPage = () => {
  const { itemId } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [renterId, setRenterId] = useState("");
  const [days, setDays] = useState(1); // Default value is 1 day
  const { userData } = useAuth();
  const { isLoading, performFetch, error } = useFetch(
    `/transactions/rentPage/${itemId}`,
    (response) => {
      if (response.success) {
        logInfo("rental status is successful", response.success);
      } else {
        logError("Error renting item:", error);
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

  const handleRentItem = () => {
    if (!startDate || !endDate) {
      logError("Please select both start and end dates.");
      return;
    }
    // Validate that end date is after start date
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      logError("End date must be after start date.");
      return;
    }
    try {
      performFetch({
        method: "POST",
        body: JSON.stringify({
          startDate,
          endDate,
          price,
          renterId,
          borrowerId: userData.user._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      logError("Error renting item. Please try again later.");
    }
  };

  return (
    <>
      {" "}
      <Header />
      <div className="pricey">
        <InputDate
          rentPageLoading={isLoading}
          itemId={itemId}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />
        <DepositPrice
          itemId={itemId}
          setRenterId={setRenterId}
          setTotalPrice={setPrice}
          days={days}
        />
        <button className="rent" onClick={handleRentItem}>
          Rent Item
        </button>
        <Checkout />

        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </div>
      <Footer />
    </>
  );
};

export default RentPage;
