import React from "react";
import Header from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import PostItemForm from "../../components/postItem/PostItemForm";
import useFetch from "../../hooks/useFetch.js";

const PostItem = () => {
  // State for fetch status
  const { isLoading, error, performFetch } = useFetch("/item", (result) => {
    // Handle successful response
    if (result.success) {
      // Navigate to details page or show success message
    } else {
      // Handle unsuccessful response
      //console.error('Error adding item:', result.error);
    }
  });

  // Handle form submission
  const handleSubmit = (formData) => {
    // Add additional fields to the form data
    const additionalFields = {
      // imageURL:
      //"https://boughbikes.com/wp-content/uploads/2022/02/website1.jpg", // This logic will be changed after hosting images service is ready
      renter_id: "65b2efd6535266ef21d4942f", // This logic will be changed after hosting log in feature is ready
    };

    // Merge the additional fields with the form data
    const postData = { ...formData, ...additionalFields };

    // Perform the fetch
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
      <Footer />
    </div>
  );
};

export default PostItem;
