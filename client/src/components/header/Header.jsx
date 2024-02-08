import React from "react";
import SignUp from "../Account/SignUp";
import Login from "../Account/Login";
import SearchIcon from "../../assets/search-icon.svg";
import Logo from "../../assets/logo-color.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <span className="button-text">
        <SignUp />
        <Login />
      </span>
      <div className="logo">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>
      <div className="search-container">
        <img src={SearchIcon} alt="Search Icon" className="search-icon" />
        <input
          type="text"
          placeholder="Bike, laptop, stroller..."
          className="search-input"
        />
      </div>
    </header>
  );
}

export default Header;
