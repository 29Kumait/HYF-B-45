import React from "react";
import Header from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import PostItemForm from "../../components/postItem/PostItemForm";

const PostItem = () => {
  return (
    <div>
      <Header />
      <h1>Here you can Post an item</h1>

      <PostItemForm />
      <Footer />
    </div>
  );
};

export default PostItem;
