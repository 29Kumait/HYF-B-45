import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm.js";
import Input from "../Input.jsx";
import Modal from "./Modal.jsx";
import "./style.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
  };

  const handleRegister = async (values) => {
    try {
      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setModalVisible(false);
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError(`An error occurred while registering: ${error.message}`);
    }
  };

  const { values, handleChange, handleSubmit, errors, isSubmitting } = useForm(
    initialValues,
    handleRegister
  );

  useEffect(() => {
    if (isModalVisible) {
      document.title = "Sign Up";
    } else {
      document.title = "Home";
    }
  }, [isModalVisible]);

  return (
    <div>
      <button className={"button"} onClick={() => setModalVisible(true)}>
        Sign Up
      </button>
      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
        <form onSubmit={handleSubmit}>
          <Input
            className="custom-input"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <Input
            className="custom-input"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />

          <Input
            className="custom-input"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />

          <br />

          <Input
            className="custom-input"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <Input
            className="custom-input"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <br />

          <Input
            className="custom-input"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <Input
            className="custom-input"
            name="city"
            value={values.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          {error && <div className="global-error">{error}</div>}

          <button
            className={"button"}
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          />
        </form>
      </Modal>
    </div>
  );
};
export default SignUp;
