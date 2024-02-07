import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { useAuth } from "./AuthProvider.jsx";
import PropTypes from "prop-types";
import "./Item.css";

function Item({ itemId }) {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const itemUrl = `/item/${itemId}`;
  const { isSignedIn } = useAuth();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    itemUrl,
    setItemData
  );

  function setItemData(data) {
    if (data && data.success) {
      setItem(data);
    } else {
      setItem(null);
    }
  }

  useEffect(() => {
    performFetch();
    const cleanup = () => {
      cancelFetch();
    };
    return cleanup;
  }, [performFetch, cancelFetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!item) return <div> not found </div>;

  const {
    title,
    category,
    description,
    price,
    image,
    deposit,
    location,
    available,
    renterName,
    renterImage,
  } = item;

  const handleRent = () => {
    if (isSignedIn) {
      navigate(`/rent/${itemId}`);
    } else {
      alert("Auth required. Please sign in to rent this item.");
    }
  };
  const handleChat = () => {
    if (isSignedIn) {
      navigate(`/chat/${itemId}`);
    } else {
      alert(" Members only. Please sign in to chat with the renter");
    }
  };

  return (
    <>
      <div>
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <p>Category: {category}</p>
        <p>Description: {description}</p>
        <p>Price: ${price}</p>
        <p>Deposit: ${deposit}</p>
        <p>Location: {location}</p>
        <p>Available: {available ? "Yes" : "No"}</p>
        <p>Renter: {renterName}</p>
        <img src={renterImage} alt={`Renter ${renterName}`} />
      </div>
      <div>
        <button onClick={handleRent}>Rent</button>
        <button onClick={handleChat}>Chat</button>
      </div>
    </>
  );
}

Item.propTypes = {
  itemId: [PropTypes.string, PropTypes.number].isRequired,
};

export default Item;
