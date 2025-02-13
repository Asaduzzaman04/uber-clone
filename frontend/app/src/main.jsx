import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router/Router"; // Adjust path as necessary

// Create the root element and render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
