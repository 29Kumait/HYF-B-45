import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [authError, setAuthError] = useState(null); // State to store authentication errors

  const logIn = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Convert non-2xx HTTP responses into user-friendly messages
        setAuthError(
          "Login.jsx failed. Please check your credentials and try again."
        );
        return;
      }

      const data = await response.json();

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsSignedIn(true);
        setUser(data.user);
        setAuthError(null);
      } else {
        setAuthError(
          "Login.jsx failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      setAuthError("An unexpected error occurred. Please try again later.");
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsSignedIn(false);
    setUser(null);
    setAuthError(null);
  };

  const autoSignIn = useCallback(() => {
    if (token) {
      setIsSignedIn(true);
    }
  }, [token]);

  useEffect(() => {
    autoSignIn();
  }, [autoSignIn]);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, logIn, signOut, user, token, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
