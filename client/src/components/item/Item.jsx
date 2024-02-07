import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
// import { useAuth } from "./AuthProvider.jsx";
import PropTypes from "prop-types";
import "./Item.css";
// import { logInfo } from "../../../../server/src/util/logging.js";

function Item() {
  const { itemId } = useParams(); // Extract itemId from URL params using useParams
  // const navigate = useNavigate();
  const [item, setItem] = useState(null);
  // const { isSignedIn } = useAuth();
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

  // const handleRent = () => {
  //   if (isSignedIn) {
  //     navigate(`/rent/${itemId}`);
  //   } else {
  //     alert("Auth required. Please sign in to rent this item.");
  //   }
  // };
  // const handleChat = () => {
  //   if (isSignedIn) {
  //     navigate(`/chat/${itemId}`);
  //   } else {
  //     alert(" Members only. Please sign in to chat with the renter");
  //   }
  // };

  return (
    <>
      <div className="item">
        <h2 className="item_title">{item.title}</h2>
        <img className="item_image" src={item.imageURL} alt={item.title} />
        <p className="item_category">Category: {item.category}</p>
        <p className="item_description">Description: {item.description}</p>
        <p>Price: ${item.price}</p>
        <p className="item_deposit">Deposit: ${item.deposit}</p>
        <p className="item_location">Location: {item.user.city}</p>
        {/* <p>Available: {available ? "Yes" : "No"}</p> */}
        <p className="tem_renter-name">
          Renter: {item.user.firstName} {item.user.lastName}
        </p>
        <img
          className="item_renter-image"
          src={item.user.userImageURL}
          alt={`Renter ${item.user.username}`}
        />
      </div>
      <div>
        <button className="button">Rent</button>
        <button className="button">Chat</button>
      </div>
    </>
  );
}

Item.propTypes = {
  itemId: PropTypes.string,
};

export default Item;
