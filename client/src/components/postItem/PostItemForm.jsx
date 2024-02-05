import React, { useState } from "react";
import "./PostItemForm.css";

const PostItemForm = () => {
  const [title, setTitle] = useState("");

  // Function to handle changes in the title input field
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // This is will be post request to the server later
    // you can console log here see if it is working
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostItemForm;
