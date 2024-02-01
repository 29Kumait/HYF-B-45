import React, { useEffect, useState } from "react";
import ItemElement from "./ItemElement";
import "./ItemsList.css";
import useFetch from "../../hooks/useFetch";

const ItemsList = () => {
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

  return (
    <ul className="product-list">
      {items.map((item) => (
        <ItemElement key={item._id} item={item} />
      ))}
    </ul>
  );
};

export default ItemsList;
