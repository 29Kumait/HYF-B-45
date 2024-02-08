import React from "react";
import Header from "../../components/header/Header";
import Landing from "../../components/header/Landing";
import TEST_ID from "./Home.testid";
import { Footer } from "../../components/footer/Footer";
import { ParentCategoriesItemsList } from "../../components/ParentCategoriesItemsList";
const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />
      <Landing />
      <ParentCategoriesItemsList />
      <Footer />
    </div>
  );
};

export default Home;
