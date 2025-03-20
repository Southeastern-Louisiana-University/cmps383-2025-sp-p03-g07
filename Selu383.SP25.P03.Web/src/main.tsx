import ReactDOM from "react-dom/client";
import "./index.css";
import TheaterFetch from "./TheaterFetch.tsx";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import TheaterPost from "./TheaterPost.tsx";
import Login from "./Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/theater" element={<TheaterFetch />} />
      <Route path="/theaterPost" element={<TheaterPost />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
);
