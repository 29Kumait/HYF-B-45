import React, { useState } from "react";
import Categories from "./categories/Categories";
import ItemsList from "./list/ItemsList";

export const ParentCategoriesItemsList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <>
      <Categories
        handleClick={handleClick}
        selectedCategory={selectedCategory}
      />
      <ItemsList selectedCategory={selectedCategory} />
    </>
  );
};
