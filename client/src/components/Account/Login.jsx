import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal.jsx";
import "./style.css";
import PropTypes from "prop-types";

const Login = ({ isInputVisible, setIsInputVisible, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true); // Start loading

    if (!username || !password) {
      setError("Please enter a username and password.");
      setIsLoading(false); // Stop loading
      return;
    }

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
          setError(data.message);
        } else {
          setError("Error occurred during login");
        }
        setIsLoading(false); // Stop loading
        return;
      }

      localStorage.setItem("token", data.token); // Store the token
      setIsInputVisible(false);
      onLoginSuccess();
      navigate("/");
    } catch (error) {
      setError(`An error occurred while registering: ${error.message}`);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={"container"}>
        <button
          className="login-button"
          onClick={() => setIsInputVisible(true)}
        >
          Sign In
        </button>
        <Modal
          isVisible={isInputVisible}
          onClose={() => setIsInputVisible(false)}
        >
          <form onSubmit={handleLogin}>
            <div className={"input-field"}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {error && <p>{error}</p>}
              <button className={"btn"} type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

Login.propTypes = {
  isInputVisible: PropTypes.bool.isRequired,
  setIsInputVisible: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;
