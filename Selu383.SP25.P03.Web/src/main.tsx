import ReactDOM from "react-dom/client";
import "./index.css";
import TheaterFetch from "./TheaterFetch.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/theater" element={<TheaterFetch />} />
    </Routes>
  </Router>
);
