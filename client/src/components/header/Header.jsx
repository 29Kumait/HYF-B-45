import React, { useState } from "react";
import SignUp from "../Account/SignUp";
import Login from "../Account/Login";
import SearchIcon from "../../assets/search-icon.svg";
import Logo from "../../assets/logo-color.svg";
import AddItemButton from "./AddItemButton";
import ProfileDropdown from "./ProfileDropdown";
import "./Header.css";
import Modal from "../Account/Modal.jsx";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const handleLogout = () => {
    // Handle logout logic
    setIsAuthenticated((prevIsAuthenticated) => !prevIsAuthenticated);
  };

  const toggleModals = (signIn, signUp) => {
    setIsSignUpVisible(signUp);
    setIsSignInVisible(signIn);
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
              <SignUp onSignUpSuccess={() => toggleModals(true, false)} />
              <Modal
                isVisible={isSignUpVisible}
                onClose={() => toggleModals(false, false)}
              >
                <SignUp />
              </Modal>
            </div>
            <div>
              <Login />
              <Modal
                isVisible={isSignInVisible}
                onClose={() => toggleModals(false, false)}
              >
                <Login />
              </Modal>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
