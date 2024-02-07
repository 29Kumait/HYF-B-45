import React, { useState } from "react";
import SearchIcon from "../../assets/search-icon.svg";
import Logo from "../../assets/logo-color.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import AddItemButton from "./AddItemButton";
import ProfileDropdown from "./ProfileDropdown";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    // Handle logout logic
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogout}>
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>
      <div className="header-content">
        <div className="search-container">
          <img src={SearchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Bike, laptop, stroller..."
            className="search-input"
          />
        </div>
        {isAuthenticated ? (
          <>
            <AddItemButton />
            <ProfileDropdown onLogout={handleLogout} />
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <button className="login-button">Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button className="get-started-button">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
