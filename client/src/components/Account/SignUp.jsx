import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import Input from "../Input.jsx";
import Modal from "./Modal.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false);
  const { isLoading, error, performFetch } = useFetch(
    "/auth/sign-up",
    (data) => {
      if (data.success) {
        setModalVisible(false);
        navigate("/login");
      }
    }
  );

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
  };

  const handleRegister = (values) => {
    // No direct try/catch needed here. Error handling is managed by useFetch's internal state.
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };

  const { values, handleChange, handleSubmit, errors, isSubmitting } = useForm(
    initialValues,
    handleRegister
  );

  useEffect(() => {
    document.title = isModalVisible ? "Sign Up" : "Home";
  }, [isModalVisible]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <button className={"button"} onClick={() => setModalVisible(true)}>
        Register
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
          {error && <div className="global-error">{error.errorMsg}</div>}
          {/* TODO: Add image Input*/}

          <button type="submit" disabled={isSubmitting || isLoading}>
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default SignUp;
