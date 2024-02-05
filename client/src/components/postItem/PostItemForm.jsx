
import React, { useState } from "react";
import "./PostItemForm.css";
import useFetch from "../../hooks/useFetch.js";

const PostItemForm = () => 
{
  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    image: "",
    containsDeposit: false,
    depositAmount: "",
  });

  // State for fetch status
  const { isLoading, error, performFetch } = useFetch("/item", (result) => {
    // Handle successful response
    if (result.success) {
      
      //navigateToDetailsPage(result.result.itemId);
    } else {
      // Handle unsuccessful response
      //console.error('Error adding item:', result.error);
    }
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle different input types
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation here if needed

    // Prepare data for submission
    const postData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      price: formData.price,
      image: formData.image,
      containsDeposit: formData.containsDeposit,
      depositAmount: formData.containsDeposit ? formData.depositAmount : null,
    };

    // Perform the fetch
    performFetch({
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // Validate form fields
  // const validateForm = (data) => {
  //   const errors = {};

  //   if (!data.title.trim()) {
  //     errors.title = "Title is required";
  //   }

  //   if (!data.category.trim()) {
  //     errors.category = "Category is required";
  //   }

  //   if (!data.imageURL.trim()) {
  //     errors.imageURL = "Image URL is required";
  //   }

  //   if (!data.price.trim()) {
  //     errors.price = "Price is required";
  //   } else if (isNaN(data.price) || +data.price <= 0) {
  //     errors.price = "Price must be a positive number";
  //   }

  //   if (data.containsDeposit && (!data.depositAmount.trim() || isNaN(data.depositAmount) || +data.depositAmount <= 0)) {
  //     errors.depositAmount = "Invalid deposit amount";
  //   }

  return (
    <div className="post-item-form-container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit} className="contaner">
        <div className="form-group">
        <label>
          Title
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
          Category
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
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
          <label>
          Contains Deposit
          <input
            type="checkbox"
            name="containsDeposit"
            checked={formData.containsDeposit}
            onChange={handleInputChange}
          />
        </label>
          </div>
        

        {formData.containsDeposit && (
          <div className="form-group">
              <label>
            Deposit Amount:
            <input
              type="number"
              name="depositAmount"
              value={formData.depositAmount}
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
export default PostItemForm 
