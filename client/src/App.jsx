import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
// import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import PostItem from "./pages/PostItem/PostItem";
import SignUp from "./components/Account/SignUp.jsx";

const App = () => {
  return (
    <>
      <div>
        <h1>My App</h1>
        <SignUp />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/post-item" element={<PostItem />} />
      </Routes>
    </>
  );
};

export default App;
