import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BusinessProvider } from "./context/BusinessContext";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>

  <BusinessProvider>
    <App />
  </BusinessProvider>

</AuthProvider>
    </React.StrictMode>
);