import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TheaterPage from "./TheaterPage";
import ResponsiveAppBar from "./Components/NavBar.tsx";
import LoginPage from "./Login/LoginPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <ResponsiveAppBar />

    <Routes>
      <Route path="/theaters/:id" element={<TheaterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>
);
