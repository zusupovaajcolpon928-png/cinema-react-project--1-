import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">C</span>
          CINEMA
        </Link>
        <nav>
          <NavLink to="/" end>
            Главная
          </NavLink>
          <a href="#movies">Фильмы</a>
        </nav>
        <span className="nav-caption">YOUR MOVIE GUIDE</span>
      </div>
    </header>
  );
}

export default Navbar;
