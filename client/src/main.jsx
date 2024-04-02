import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BlogContextProvider } from "./context/BlogContext";
import { LostandFoundContextProvider } from "./context/LostandFound.jsx";
import { AuthContextProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <AuthContextProvider>
      <NotificationProvider>
      <BlogContextProvider>
        <LostandFoundContextProvider>
          <App />
        </LostandFoundContextProvider>
      </BlogContextProvider>
      </NotificationProvider> 
    </AuthContextProvider>
  </React.StrictMode>
);
