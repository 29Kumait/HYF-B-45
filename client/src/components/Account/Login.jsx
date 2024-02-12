import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal.jsx";
import { useAuth } from "./AuthContext"; // Import the AuthContext
import "./style.css";
import PropTypes from "prop-types";

const Login = ({ isInputVisible, setIsInputVisible }) => {
  const { login } = useAuth();
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
      await login(username, password);
      setIsInputVisible(false);
      navigate("/");
    } catch (error) {
      setError(`An error occurred while logging in: ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleCloseAndReset = () => {
    setIsInputVisible(false);
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className={"btn"} type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
                <button
                  className={"btn"}
                  type="button"
                  onClick={handleCloseAndReset}
                >
                  Cancel
                </button>
              </div>
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
};

export default Login;
