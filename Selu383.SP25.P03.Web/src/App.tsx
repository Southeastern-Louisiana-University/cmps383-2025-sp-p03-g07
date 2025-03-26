import "./home.css";
import MovieCarousel from "./Components/MovieCarousel"; // ✅ New import

function App() {
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-left">
            <div>
              <img alt="Bike Logo" className="logo-img" />
            </div>
            <ul className="nav-links">
              <li>
                <a href="#">See a Movie</a>
              </li>
              <li>
                <a href="#">Find a Theatre</a>
              </li>
              <li>
                <a href="#">Food & Drinks</a>
              </li>
              <li>
                <a href="#">More ▼</a>
              </li>
            </ul>
          </div>

          <div className="navbar-center">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <div className="navbar-right">
            <div className="account-links">
              <a href="#">
                <i className="fas fa-film"></i> Showtimes
              </a>
              <a href="#">
                <i className="fas fa-user"></i> Sign In
              </a>
              <a href="#" className="join">
                Join Now ▼
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <MovieCarousel /> {/* ✅ Show movies here */}
      </main>
    </>
  );
}

export default App;
