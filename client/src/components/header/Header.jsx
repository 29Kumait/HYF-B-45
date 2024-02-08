import React, { useState } from "react";
import SignUp from "../Account/SignUp";
import Login from "../Account/Login";
import SearchIcon from "../../assets/search-icon.svg";
import Logo from "../../assets/logo-color.svg";
import AddItemButton from "./AddItemButton";
import ProfileDropdown from "./ProfileDropdown";
import "./Header.css";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    // Handle logout logic
    setIsAuthenticated((prevIsAuthenticated) => !prevIsAuthenticated);
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
            <div>
              <SignUp />
            </div>
            <div>
              <Login />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
