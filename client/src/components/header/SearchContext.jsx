import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const initialState = {
  title: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TITLE":
      return { ...state, title: action.payload };
    default:
      return state;
  }
};

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
