import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
import PostItem from "./pages/PostItem/PostItem";
import Item from "./pages/Item/Item.jsx";
import { AuthProvider } from "./components/Account/AuthContext";
import SearchItem from "./pages/SearchItem/SearchItem.jsx";
import { SearchProvider } from "./components/header/SearchContext.jsx";

const App = () => {
  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post-item" element={<PostItem />} />
            <Route path="/item/:itemId" element={<Item />} />
            <Route path="/search" element={<SearchItem />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </>
  );
};

export default App;
