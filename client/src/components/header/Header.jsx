import React from "react";
import SearchIcon from "../../assets/search-icon.svg";
import Logo from "../../assets/logo-color.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>
      <div className="header-content">
        <div className="search-container">
          <img src={SearchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Find what you need"
            className="search-input"
          />
        </div>
        <button className="login-button">Sign In</button>
        <button className="get-started-button">Sign Up</button>
      </div>
    </header>
  );
}

export default Header;
