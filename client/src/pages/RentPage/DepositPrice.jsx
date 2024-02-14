import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./rentStyle.css";

const DepositPrice = ({ itemId, setRenterId, setTotalPrice }) => {
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
        setTotalPrice(response.data.price);
      } catch (err) {
        setError("Unable to fetch rental details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentalInfo();
  }, [itemId, setRenterId]);

  if (loading) return <div>Loading rental details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!rentalInfo) return <div>No rental details available.</div>;

  return (
    <div>
      <p>Rental Price: {rentalInfo.Price}</p>
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
};

export default DepositPrice;
