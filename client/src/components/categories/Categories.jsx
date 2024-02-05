import React, { useEffect, useState } from "react";
import "./Categories.css";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";

function Categories({ handleClick, selectedCategory }) {
  const [categories, setCategories] = useState(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/category",
    (response) => {
      setCategories(response.result);
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (error != null) {
    content = <div>Error: {error.toString()}</div>;
  } else {
    content = (
      <ul className="list-categories">
        {categories &&
          categories.map((category) => {
            const isSelected = category.name === selectedCategory;
            return (
              <li
                key={category._id}
                onClick={() => handleClick(category.name)}
                className={isSelected ? "selected-category" : ""}
              >
                <img className="icon" src={category.icon} alt={category.name} />
                <span>{category.name}</span>
              </li>
            );
          })}
      </ul>
    );
  }

  return <div className="categories">{content}</div>;
}

Categories.propTypes = {
  handleClick: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
};

export default Categories;
