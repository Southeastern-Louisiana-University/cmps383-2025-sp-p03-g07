import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Theater from "./TheaterPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Theater />
  </StrictMode>
);
