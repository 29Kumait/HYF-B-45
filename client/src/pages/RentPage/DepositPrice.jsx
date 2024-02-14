import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./rentStyle.css";
import { logError } from "../../../../server/src/util/logging";

const DepositPrice = ({ itemId, setRenterId, setTotalPrice, days }) => {
  const [rentalInfo, setRentalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRentalInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/expense/rentPage/${itemId}`
        );
        setRentalInfo(response.data);
        setRenterId(response.data.renterId);
        setTotalPrice((response.data.price * days).toFixed(2));
      } catch (err) {
        setError("Unable to fetch rental details. Please try again later.");
        logError("Error fetching rental details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalInfo();
  }, [itemId, setRenterId, setTotalPrice, days]);

  if (loading) return <div>Loading rental details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!rentalInfo) return <div>No rental details available.</div>;

  return (
    <div>
      <p>Total Price: {(rentalInfo.price * days).toFixed(2)}</p>{" "}
      <p>
        Deposit Amount:{" "}
        {rentalInfo.depositRequired
          ? rentalInfo.depositAmount
          : "No deposit required"}
      </p>
    </div>
  );
};

DepositPrice.propTypes = {
  itemId: PropTypes.string.isRequired,
  setRenterId: PropTypes.func.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
  days: PropTypes.number.isRequired,
};

export default DepositPrice;
