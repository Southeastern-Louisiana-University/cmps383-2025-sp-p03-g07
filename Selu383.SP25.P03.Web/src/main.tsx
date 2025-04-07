import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TheaterPage from "./TheaterPage/TheaterPage.tsx";
import ResponsiveAppBar from "./Components/NavBar.tsx";
import LoginPage from "./Login/LoginPage.tsx";
import TheaterPost from "./TheaterPage/TheaterPost.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <ResponsiveAppBar />

    <Routes>
      <Route path="/theaters/:id" element={<TheaterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/theaters/post" element={<TheaterPost />} />
      <Route path="/check-me" element={<GetAuth />} />
    </Routes>
  </Router>
);
