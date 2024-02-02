import React, { useEffect, useState } from "react";
import ItemElement from "./ItemElement";
import "./ItemsList.css";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";

const ItemsList = ({ selectedCategory }) => {
  const [items, setItems] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/item",
    (response) => {
      setItems(response.result);
    }
  );
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.toString()}</div>;
  }

  return selectedCategory ? (
    <ul className="product-list">
      {items
        .filter((item) => item.category === selectedCategory)
        .map((item) => (
          <ItemElement key={item._id} item={item} />
        ))}
    </ul>
  ) : (
    <ul className="product-list">
      {items.map((item) => (
        <ItemElement key={item._id} item={item} />
      ))}
    </ul>
  );
};

ItemsList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default ItemsList;
