import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./components/item/AuthProvider";
import AppWrapper from "./AppWrapper";
import App from "./App";

ReactDOM.render(
  <AppWrapper>
    <AuthProvider>
      <App />
    </AuthProvider>
  </AppWrapper>,
  document.getElementById("root")
);
