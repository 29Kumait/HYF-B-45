import React, { useState } from "react";
import Header from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import PostItemForm from "../../components/postItem/PostItemForm";
import useFetch from "../../hooks/useFetch.js";
import SuccessPopup from "../../components/postItem/SuccessPopup";

const PostItem = () => {
  const { isLoading, error, performFetch } = useFetch("/item", (result) => {
    // Handle successful response
    if (result.success) {
      setSuccess(true); // Set the state to indicate success
      setItemId(result.item._id); // Set the ID of the newly added item
    } else {
      // Handle unsuccessful response
    }
  });

  const [success, setSuccess] = useState(false); // State to track success
  const [itemId, setItemId] = useState(null); // State to store the item ID

  const handleSubmit = (formData) => {
    const additionalFields = {
      renter_id: "65c3613cf5554cd36b01fda8",
    };
    const postData = { ...formData, ...additionalFields };

    performFetch({
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <Header />
      <PostItemForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
      {success && <SuccessPopup itemId={itemId} />}
      <Footer />
    </div>
  );
};

export default PostItem;
