import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
import PostItem from "./pages/PostItem/PostItem";
import Item from "./pages/Item/Item.jsx";
import { AuthProvider } from "./components/Account/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-item" element={<PostItem />} />
          <Route path="/item/:itemId" element={<Item />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
