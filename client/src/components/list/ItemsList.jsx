import React, { useEffect, useState } from "react";
import ItemElement from "./ItemElement";
import "./ItemsList.css";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";

const ItemsList = ({ selectedCategory }) => {
  const itemsPerPage = 9; // items per page
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryState, setSelectedCategoryState] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true); // tracking data availability
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/item?page=${currentPage}${
      selectedCategoryState ? `&category=${selectedCategoryState}` : ""
    }`,
    (response) => {
      const newItems = response.result;
      setItems(newItems);
      // Check if there are more items
      setHasMoreData(
        newItems.length === itemsPerPage &&
          response.totalItems > currentPage * itemsPerPage
      );
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [currentPage, selectedCategoryState]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    setSelectedCategoryState(selectedCategory);
    // Reset page when category changes
    setCurrentPage(1);
  }, [selectedCategory]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.toString()}</div>;
  }

  return (
    <div>
      <ul className="product-list">
        {items
          .filter(
            (item) =>
              !selectedCategoryState || item.category === selectedCategoryState
          )
          .map((item) => (
            <ItemElement key={item._id} item={item} />
          ))}
      </ul>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={handleNextPage}
          disabled={!hasMoreData || items.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

ItemsList.propTypes = {
  selectedCategory: PropTypes.string,
};

export default ItemsList;
