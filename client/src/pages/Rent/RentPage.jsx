import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DateInput from "../../components/DateInput/DateInput"; // Update the import path as needed
import PropTypes from "prop-types";

const RentPage = ({ itemId }) => {
  return (
    <div>
      <Header />
      <h1>Rent Page</h1>
      <DateInput itemId={itemId} />
      <Footer />
    </div>
  );
};
RentPage.propTypes = {
  itemId: PropTypes.string.isRequired,
};
export default RentPage;
