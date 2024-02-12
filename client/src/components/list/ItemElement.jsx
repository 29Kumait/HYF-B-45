import React from "react";
import PropTypes from "prop-types";
import FakeUserProfilePicture from "../../assets/fake-user.jpg";
import { Link } from "react-router-dom";
import "./ItemsList.css"; // Import the CSS file

const ItemElement = ({ item }) => {
  // Function to shorten the description to the first 5 words
  const shortenDescription = (text, words) => {
    const textWords = text.split(" ");
    const shortenedText = textWords.slice(0, words).join(" ");
    return shortenedText;
  };

  return (
    <li className="product-item">
      <div className="product-item__owner">
        <img src={FakeUserProfilePicture} alt="Owner" />
        <span>Emma</span>
      </div>
      <img
        src={item.imageURL}
        alt={item.title}
        className="product-item__image"
      />
      <h2 className="product-item__name">
        {item.title} <span> - {item.category} </span>
      </h2>
      <div className="item-description">
        {" "}
        {shortenDescription(item.description, 7)}...
      </div>
      <div className="product-item__view">
        <span className="product-item__price">
          {item.price === null ? "Free to rent" : `$${item.price}/per day`}
        </span>
        {/* Link to the DetailedPage with the itemId */}
        <Link to={`/item/${item._id}`} className="product-item__view-button">
          View Details
        </Link>{" "}
      </div>
    </li>
  );
};
ItemElement.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,
};

export default ItemElement;
