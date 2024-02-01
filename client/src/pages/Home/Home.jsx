import React from "react";
import Header from "../../components/header/Header";
import Categories from "../../components/categories/Categories";
import Landing from "../../components/header/Landing";
import ItemsList from "../../components/list/ItemsList";
import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />
      <Landing />
      <Categories />
      <ItemsList />
    </div>
  );
};

export default Home;
