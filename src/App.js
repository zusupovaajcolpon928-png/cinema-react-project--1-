import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© 2026 CINEMA. Информация о фильмах предоставлена TMDB.</p>
      </footer>
    </>
  );
}

export default App;
