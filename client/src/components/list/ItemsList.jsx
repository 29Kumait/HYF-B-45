import React from "react";
import ItemElement from "./ItemElement";
import "./ItemsList.css";

const ItemsList = () => {
  const products = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <ul className="product-list">
      {products.map((productId) => (
        <ItemElement key={productId} />
      ))}
    </ul>
  );
};

export default ItemsList;
