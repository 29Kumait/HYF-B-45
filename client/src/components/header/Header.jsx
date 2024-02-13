import React, { useState, useContext } from "react";
import { useAuth } from "../Account/AuthContext";
import SignUp from "../Account/SignUp";
import Login from "../Account/Login";
import SearchIcon from "../../assets/search-icon.svg";
import Logo from "../../assets/logo-color.svg";
import AddItemButton from "./AddItemButton";
import ProfileDropdown from "./ProfileDropdown";
import "./Header.css";
import { SearchContext } from "./SearchContext";

function Header() {
  const { isAuthenticated, userData, logout } = useAuth();
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const { dispatch } = useContext(SearchContext);
  const [searchValue, setSearchValue] = useState("");

  const handleSignUpSuccess = () => {
    setIsSignInVisible(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>
      <div className="header-content">
        <div className="search-container">
          <img
            src={SearchIcon}
            alt="Search Icon"
            className="search-icon"
            onClick={() =>
              dispatch({ type: "SEARCH_TITLE", payload: searchValue })
            }
          />
          <input
            type="text"
            placeholder="Bike, laptop, stroller..."
            className="search-input"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </div>
        {isAuthenticated ? (
          <>
            <AddItemButton />
            <ProfileDropdown
              onLogout={logout}
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
