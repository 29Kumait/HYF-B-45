import React from "react";
import { useState } from "react";
import "./style.css";
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputVisible, setInputVisible] = useState(false);

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

      if (!response.ok) {
        setError("Network response was not ok");
        setIsLoading(false); // Stop loading
        return;
      }

      const data = await response.json();

      setIsLoggedIn(true);
      localStorage.setItem("token", data.token); // Store the token
      // TODO:: Redirect page
    } catch (error) {
      setError(`An error occurred while registering: ${error.message}`);
    }
    setIsLoading(false);
  };

  const toggleInputVisibility = () => {
    setInputVisible((prevIsInputVisible) => !prevIsInputVisible);
  };

  return (
    <>
      <button className="login-button" onClick={toggleInputVisibility}>
        {isInputVisible ? "Out" : "Sign In"}
      </button>

      <div className={"container"}>
        {!isLoggedIn && (
          <div>
            {isInputVisible && (
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
                    {isLoading ? "in" : "Sign In"}
                  </button>
                </div>
              </form>
            )}

            {error && <p>{error}</p>}
          </div>
        )}
        {isLoggedIn && <div>Hi, {username}.</div>}
      </div>
    </>
  );
};
export default Login;
