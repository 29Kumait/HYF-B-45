import React from "react";
import Header from "../../components/header/Header";
import Categories from "../../components/categories/Categories";
import Landing from "../../components/header/Landing";

import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />
      <Landing />
      <Categories />
    </div>
  );
};

export default Home;
