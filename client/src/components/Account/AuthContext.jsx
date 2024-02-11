import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { logInfo, logError } from "../../../../server/src/util/logging.js";

// Create the authentication context
export const AuthContext = createContext();

// Create the authentication provider component
export const AuthProvider = ({ children }) => {
  // State to hold authentication status and user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);


  // Method to handle user login
  const login = async (username, password) => {
    try {
      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(data.message);
        } else {
          throw new Error("Error occurred during login");
        }
      }

      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      const userDataResponse = await fetchUserData(data.token);
      setUserData(userDataResponse);
      logInfo("userDataResponse", userDataResponse);
    } catch (error) {
      logError("Login error:", error);
      setIsAuthenticated(false);
      throw error;
    }
  };

  // Method to handle user logout
  const logout = () => {
    // Clear authentication status and user data
    setIsAuthenticated(false);
    setUserData(null);

    // Clear token from localStorage
    localStorage.removeItem("token");
  };

  // Method to fetch user data from the server using the token
  const fetchUserData = async (token) => {
    try {
      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/user/userInfo`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userDataResponse = await response.json();
      return userDataResponse;
    } catch (error) {
      logError("Error fetching user data:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export the authentication consumer hook
export const useAuth = () => React.useContext(AuthContext);
