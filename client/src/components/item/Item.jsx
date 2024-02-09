import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { useAuth } from "./AuthProvider.jsx";
import PropTypes from "prop-types";
import "./Item.css";
import { Link } from "react-router-dom";
import Popup from "../popUp/Popup.jsx";
function Item() {
  const { itemId } = useParams(); // Extract itemId from URL params using useParams
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [item, setItem] = useState(null);
  const { isSignedIn } = useAuth();
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/item/${itemId}`,
    (response) => {
      const newItem = response.result; // Extract the item from the response
      setItem(newItem); // Update the state with the received item
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [itemId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (!item) {
    return <div>No data found.</div>;
  }

  const handleRent = () => {
    handleNavigate(`/rent/${itemId}`);
  };
  const handleChat = () => {
    handleNavigate(`/chat/${itemId}`);
  };

  const handleNavigate = (path) => {
    if (isSignedIn) {
      navigate(path);
    } else {
      setShowPopup(true); // Show the popup if the user is not signed in
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="item">
        <div className="item_renter-info">
          <img
            className="item_renter-image"
            src={item.user.userImageURL}
            alt={`Renter ${item.user.username}`}
          />
          <span>
            {item.user.firstName} {item.user.lastName}
          </span>
          <Link to="/">
            <button className="go-back">Go back</button>
          </Link>
        </div>
        <h2 className="item_title">{item.title}</h2>
        <img className="item_image" src={item.imageURL} alt={item.title} />
        <div className="item_details">
          <p className="item_detail">
            <span className="item_label">Category:</span> {item.category}
          </p>
          <p className="item_detail">
            <span className="item_label">Description:</span> {item.description}
          </p>
          <p className="item_detail">
            <span className="item_label">Price:</span> ${item.price}
          </p>
          <p className="item_detail">
            <span className="item_label">Deposit:</span> ${item.deposit}
          </p>
          <p className="item_detail">
            <span className="item_label">Location:</span> {item.user.city}
          </p>
        </div>
        <div className="buttons">
          <button className="rent" onClick={handleRent}>
            Rent
          </button>
          <button className="chat" onClick={handleChat}>
            Chat
          </button>
        </div>
      </div>
      {showPopup && (
        <Popup
          message="Please sign in to access this feature!"
          buttonText="Close"
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}

Item.propTypes = {
  itemId: PropTypes.string,
};

export default Item;
