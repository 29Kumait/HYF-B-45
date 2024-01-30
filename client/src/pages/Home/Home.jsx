import React from "react";
import Header from "../../components/header/Header";

import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />
    </div>
  );
};

export default Home;
