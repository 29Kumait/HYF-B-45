import React from "react";
import PropTypes from "prop-types";
import ProfilePic from "../../assets/fake-user.jpg";

const UserProfile = ({ user }) => {
  const { firstName, lastName, username, city, email, userImageURL } = user;

  return (
    <div className="user-profile-container">
      <div className="user-image">
        <img
          src={userImageURL || ProfilePic} // Use ProfilePic if userImageURL is not provided
          alt="User"
          style={{ width: "200px", height: "200px", borderRadius: "50%" }}
        />
      </div>
      <div className="user-details">
        <h1>
          Hi {firstName && lastName ? `${firstName} ${lastName}` : username}{" "}
        </h1>
        <p>Location: {city}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

// PropTypes for type checking
UserProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    userImageURL: PropTypes.string,
  }).isRequired,
};

export default UserProfile;
