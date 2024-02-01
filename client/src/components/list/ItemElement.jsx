import React from "react";
import MoProfilePicture from "../../assets/mo.png";
import ProductImage from "../../assets/1.jpg";

import "./ItemsList.css"; // Import the CSS file

const ItemElement = () => {
  return (
    <li className="product-item">
      <div className="product-item__owner">
        <img src={MoProfilePicture} alt="Owner" />
        <span>Mohammed</span>
      </div>
      <img src={ProductImage} alt="Product" className="product-item__image" />
      <h2 className="product-item__name">Product Title</h2>
      <p className="product-item__description">
        Product description, this product is very good
      </p>
      <div className="product-item__chat">
        <span className="product-item__price">$19.99</span>
        <button className="product-item__chat-button">View Details</button>
      </div>
    </li>
  );
};

export default ItemElement;
