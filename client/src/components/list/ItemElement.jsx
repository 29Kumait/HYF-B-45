import React from "react";
import PropTypes from "prop-types";
import MoProfilePicture from "../../assets/mo.png";

import "./ItemsList.css"; // Import the CSS file

const ItemElement = ({ item }) => {
  return (
    <li className="product-item">
      <div className="product-item__owner">
        <img src={MoProfilePicture} alt="Owner" />
        <span>Mohammed</span>
      </div>
      <img
        src={item.imageURL}
        alt={item.title}
        className="product-item__image"
      />
      <h2 className="product-item__name">{item.title}</h2>
      <div className="product-item__view">
        <span className="product-item__price">${item.price}/ per day</span>
        <button className="product-item__view-button">View Details</button>
      </div>
    </li>
  );
};
ItemElement.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemElement;
