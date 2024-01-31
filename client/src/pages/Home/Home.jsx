import React from "react";
import Header from "../../components/header/Header";
import ItemsList from "../../components/list/ItemsList";

import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />
      <ItemsList />
    </div>
  );
};

export default Home;
