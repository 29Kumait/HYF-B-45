import React, { useState } from "react";
import { useAuth } from "../Account/AuthContext";
import SignUp from "../Account/SignUp";
import Login from "../Account/Login";
import SearchIcon from "../../assets/search-icon.svg";
import Logo from "../../assets/logo-color.svg";
import AddItemButton from "./AddItemButton";
import ProfileDropdown from "./ProfileDropdown";
import "./Header.css";

function Header() {
  const { isAuthenticated, userData } = useAuth();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignInVisible, setIsSignInVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const handleSignUpSuccess = () => {
    setIsSignInVisible(true);
  };

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
            placeholder="Bike, laptop, stroller..."
            className="search-input"
          />
        </div>
        {isAuthenticated ? (
          <>
            <AddItemButton />
            <ProfileDropdown
              onLogout={handleLogout}
              profilePicture={userData?.user.userImageURL}
            />
          </>
        ) : (
          <>
            <SignUp onSignUpSuccess={handleSignUpSuccess} />
            <Login
              isInputVisible={isSignInVisible}
              setIsInputVisible={setIsSignInVisible}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
