import React, { useState } from "react";
import "./PostItemForm.css";

import CategorySelect from "./CategorySelect";
import PropTypes from "prop-types";

const PostItemForm = ({ onSubmit, isLoading, error }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    category_id: "",
    description: "",
    price: "",
    deposit: "",
  });

  const [showDepositField, setShowDepositField] = useState(false);

  // get the category id and name
  const handleCategorySelect = (categoryId, categoryName) => {
    setFormData({
      ...formData,
      category: categoryName,
      category_id: categoryId,
    });
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Convert value to number if the input type is "number"
    const parsedValue = type === "number" ? parseFloat(value) : value;

    // Handle different input types
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : parsedValue,
    }));
  };

  const handleCheckboxChange = () => {
    setShowDepositField(!showDepositField); // Toggle the state (true -> false, false -> true)
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.price < 0) {
      alert("Price cannot be negative");
      return; // Prevent form submission
    }
    if (formData.deposit < 0) {
      alert("Deposit cannot be negative");
      return; // Prevent form submission
    }
    onSubmit(formData);
  };

  return (
    <div className="post-item-form-container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="form-group">
          <label>
            Title*
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Category*
            <CategorySelect onSelectCategory={handleCategorySelect} />
          </label>
        </div>

        <div className="form-group">
          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label className="label-checkbox">
            <input
              type="checkbox"
              name="containsDeposit"
              checked={showDepositField}
              onChange={handleCheckboxChange}
            />
            Contains Deposit
          </label>
        </div>

        {showDepositField && (
          <div className="form-group">
            <label>
              Deposit Amount:
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleInputChange}
                max={formData.price * 0.5}
                required
              />
            </label>
          </div>
        )}

        <div className="form-group">
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Item"}
          </button>
        </div>

        {error && <div>Error: {error}</div>}
      </form>
    </div>
  );
};

PostItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default PostItemForm;
