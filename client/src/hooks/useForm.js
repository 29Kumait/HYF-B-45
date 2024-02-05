import { useState, useCallback, useRef, useEffect } from "react";

export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const validate = useCallback(() => {
    let errors = {};

    // Username validation
    if (!values.username.trim()) errors.username = "Username required";

    // Email validation
    if (!values.email) {
      errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    // Password validation
    if (!values.password) {
      errors.password = "Password is required";
    } else if (
      values.password.length < 8 ||
      !/\d/.test(values.password) ||
      !/[a-zA-Z]/.test(values.password)
    ) {
      errors.password =
        "Password needs to be 8 characters or more and contain at least one number and one letter";
    }

    // Confirm password validation
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // City validation
    if (!values.city) {
      errors.city = "City is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [values]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        setSubmitting(true);
        await onSubmit(values);
      } finally {
        if (isMounted.current) {
          setSubmitting(false); // Only update if the component is mounted
        }
      }
    }
  };

  return { values, handleChange, handleSubmit, errors, isSubmitting };
};
