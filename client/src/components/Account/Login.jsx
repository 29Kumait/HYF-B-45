import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal.jsx";
import "./style.css";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputVisible, setInputVisible] = useState(false);

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

      setIsLoggedIn(true);
      localStorage.setItem("token", data.token); // Store the token
      navigate("/");
    } catch (error) {
      setError(`An error occurred while registering: ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const toggleInputVisibility = () => {
    setInputVisible((prevIsInputVisible) => !prevIsInputVisible);
  };

  return (
    <>
      {isLoggedIn ? (
        <button className="login-button" onClick={handleLogout}>
          Sign Out
        </button>
      ) : (
        <button className="login-button" onClick={toggleInputVisibility}>
          Sign In
        </button>
      )}

      <div className={"container"}>
        {!isLoggedIn && (
          <div>
            <Modal isVisible={isInputVisible} onClose={toggleInputVisibility}>
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
                  <button className={"btn"} type="submit" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </form>
            </Modal>
            {error && <p>{error}</p>}
          </div>
        )}
        {isLoggedIn && (
          <div>
            Hi,
            {username}.
          </div>
        )}
      </div>
    </>
  );
};
export default Login;
