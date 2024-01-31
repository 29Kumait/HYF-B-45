import React from "react";
import Header from "../../components/header/Header";
import Categories from "../../components/categories/Categories";

import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />
      <Categories />
    </div>
  );
};

export default Home;
