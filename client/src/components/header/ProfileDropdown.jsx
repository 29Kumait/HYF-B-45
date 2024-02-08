import React, { useState } from "react";
import "./ProfileDropdown.css";
import ProfilePic from "../../assets/fake-user.jpg";
import PropTypes from "prop-types";

const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    // Close the dropdown after logout
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="profile-picture" onClick={toggleDropdown}>
        <img src={ProfilePic} alt="Profile" />
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={handleLogout}>Logout</li>
          <li>We can add other options</li>
          <li>And more options</li>
        </ul>
      )}
    </div>
  );
};

ProfileDropdown.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default ProfileDropdown;
