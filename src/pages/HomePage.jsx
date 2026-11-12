import { useEffect, useState } from "react";
import { getCategoryCatalog, getNowPlaying, searchMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

const categories = [
  { key: "all", label: "Все" },
  { key: "animation", label: "Мультфильм" },
  { key: "drama", label: "Дорама" },
  { key: "horror", label: "Ужасы" },
  { key: "comedy", label: "Комедия" },
];

const fallbackCategoryMovies = {
  animation: [
    { id: 101, title: "Spider-Man: Across the Spider-Verse", overview: "Мультфильм про героев из разных миров.", release_date: "2023-06-02", vote_average: 8.5, poster_path: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Animation" }, { name: "Action" }], production_countries: [{ name: "USA" }] },
    { id: 102, title: "Toy Story", overview: "Волшебная история о дружбе игрушек.", release_date: "1995-11-22", vote_average: 8.3, poster_path: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Animation" }, { name: "Comedy" }], production_countries: [{ name: "USA" }] },
    { id: 103, title: "Coco", overview: "Путешествие через музыку и семью.", release_date: "2017-11-22", vote_average: 8.4, poster_path: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Animation" }, { name: "Family" }], production_countries: [{ name: "USA" }] },
    { id: 104, title: "Shrek", overview: "Огр и принцесса в забавной истории.", release_date: "2001-05-18", vote_average: 7.9, poster_path: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Animation" }, { name: "Comedy" }], production_countries: [{ name: "USA" }] },
  ],
  drama: [
    { id: 201, title: "My Love from the Star", overview: "Корейская романтическая дорама о необычной любви.", release_date: "2013-12-18", vote_average: 8.6, poster_path: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Romance" }, { name: "Drama" }], production_countries: [{ name: "South Korea" }] },
    { id: 202, title: "Crash Landing on You", overview: "Корейская романтическая история о любви сквозь границы.", release_date: "2019-12-14", vote_average: 8.9, poster_path: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Romance" }, { name: "Drama" }], production_countries: [{ name: "South Korea" }] },
    { id: 203, title: "Our Beloved Summer", overview: "Лёгкая романтическая история о любви и воспоминаниях.", release_date: "2021-12-06", vote_average: 8.3, poster_path: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Romance" }, { name: "Drama" }], production_countries: [{ name: "South Korea" }] },
    { id: 204, title: "Reply 1988", overview: "Тёплая дорама о дружбе, семье и любви.", release_date: "2015-11-06", vote_average: 9.0, poster_path: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Romance" }, { name: "Drama" }], production_countries: [{ name: "South Korea" }] },
  ],
  horror: [
    { id: 401, title: "The Conjuring", overview: "Семья сталкивается с пугающими явлениями.", release_date: "2013-07-19", vote_average: 7.5, poster_path: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Horror" }, { name: "Thriller" }], production_countries: [{ name: "USA" }] },
    { id: 402, title: "It", overview: "Клоун преследует детей в маленьком городе.", release_date: "2017-09-08", vote_average: 7.3, poster_path: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Horror" }, { name: "Thriller" }], production_countries: [{ name: "USA" }] },
    { id: 403, title: "Train to Busan", overview: "Поезд превращается в ловушку для выживания.", release_date: "2016-07-20", vote_average: 7.5, poster_path: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Action" }, { name: "Horror" }], production_countries: [{ name: "South Korea" }] },
    { id: 404, title: "The Exorcist", overview: "Духовное зло в центре семьи.", release_date: "1973-12-26", vote_average: 8.0, poster_path: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Horror" }], production_countries: [{ name: "USA" }] },
  ],
  comedy: [
    { id: 501, title: "The Hangover", overview: "Забавное путешествие после вечеринки.", release_date: "2009-06-05", vote_average: 7.7, poster_path: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Comedy" }], production_countries: [{ name: "USA" }] },
    { id: 502, title: "Superbad", overview: "Комедия про подростков и неприятности.", release_date: "2007-08-17", vote_average: 7.7, poster_path: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Comedy" }], production_countries: [{ name: "USA" }] },
    { id: 503, title: "Bridesmaids", overview: "Праздничная комедия о подружках невесты.", release_date: "2011-05-13", vote_average: 6.9, poster_path: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Comedy" }], production_countries: [{ name: "USA" }] },
    { id: 504, title: "Home Alone", overview: "Семейная комедия с домашним хаосом.", release_date: "1990-11-16", vote_average: 7.7, poster_path: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=80", backdrop_path: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80", genres: [{ name: "Comedy" }, { name: "Family" }], production_countries: [{ name: "USA" }] },
  ],
};

function matchesCategory(movie, category) {
  if (category === "all") return true;

  const genreNames = (movie?.genres || []).map((genre) => String(genre?.name || "").toLowerCase());
  const genreIds = (movie?.genre_ids || movie?.genres?.map((genre) => genre.id) || []).map(Number);
  const countries = (movie?.production_countries || []).map((country) => String(country?.name || "").toLowerCase());
  const isKorean = movie?.original_language === "ko" || countries.some((country) => country.includes("korea"));

  switch (category) {
    case "animation":
      return genreIds.includes(16) || genreNames.some((genre) => genre.includes("animation"));
    case "drama":
      return isKorean && (genreIds.includes(10749) || genreNames.some((genre) => genre.includes("romance")));
    case "horror":
      return genreIds.includes(27) || genreNames.some((genre) => genre.includes("horror"));
    case "comedy":
      return genreIds.includes(35) || genreNames.some((genre) => genre.includes("comedy"));
    default:
      return true;
  }
}

function filterMovies(movies, category) {
  if (category === "all") return movies;
  return movies.filter((movie) => matchesCategory(movie, category)).slice(0, 100);
}

const demoPosters = {
  "Spider-Man: Across the Spider-Verse": "https://media.themoviedb.org/t/p/w220_and_h330_face/wH0kbTvbrvtlCygso7Ye2ZfGfM1.jpg",
  "Toy Story": "https://media.themoviedb.org/t/p/w220_and_h330_face/gRLk7XpdRyNa697taDKtFx3l6qV.jpg",
  Coco: "https://media.themoviedb.org/t/p/w220_and_h330_face/jvYsGaUqN8ymH696kRfVJjJ3GIl.jpg",
  Shrek: "https://media.themoviedb.org/t/p/w220_and_h330_face/5OPCH713UIEeWuvRZpVkkzrZ3Hd.jpg",
  "My Love from the Star": "https://media.themoviedb.org/t/p/w220_and_h330_face/o5EYVYCVtDUdajP4rWfv6q0BTmm.jpg",
  "Crash Landing on You": "https://media.themoviedb.org/t/p/w220_and_h330_face/fgBNLPr6mC8pxuR79ENAJY4nBmj.jpg",
  "Our Beloved Summer": "https://media.themoviedb.org/t/p/w220_and_h330_face/bA15g6OLmhQ2HkURRaCztA2jwqI.jpg",
  "Reply 1988": "https://media.themoviedb.org/t/p/w220_and_h330_face/655MownSWwplhvVlXERRJ4OSOG2.jpg",
  "The Conjuring": "https://media.themoviedb.org/t/p/w220_and_h330_face/dq99MpZPTpHOFaZCGvYz3o2uwQk.jpg",
  It: "https://media.themoviedb.org/t/p/w220_and_h330_face/tM3xcPo8UNuJFCXO0CkmchBjPvd.jpg",
  "Train to Busan": "https://media.themoviedb.org/t/p/w220_and_h330_face/zrWFD3ZW4VkiX4FpEfjpl7M5mHL.jpg",
  "The Exorcist": "https://media.themoviedb.org/t/p/w220_and_h330_face/isLlJvBBrfvCvdOzGLaNtPKMEvh.jpg",
  "The Hangover": "https://media.themoviedb.org/t/p/w220_and_h330_face/eqfuqXcv0MlbnzihcfsTaTGMbd.jpg",
  Superbad: "https://media.themoviedb.org/t/p/w220_and_h330_face/vAXEzegiSceoU9a0FJWFidUsYbr.jpg",
  Bridesmaids: "https://media.themoviedb.org/t/p/w220_and_h330_face/dLcHboNVJtcUziHB067rlS3R4Wf.jpg",
  "Home Alone": "https://media.themoviedb.org/t/p/w220_and_h330_face/e6TQfEJbaFqueq1CIvqfpse4yNF.jpg",
};

function getDemoCategoryCatalog() {
  const assignedMovies = new Set();

  return categories.slice(1).reduce((catalog, category) => {
    catalog[category.key] = (fallbackCategoryMovies[category.key] || []).filter((movie) => {
      const identity = `${movie.title.toLowerCase()}-${movie.release_date.slice(0, 4)}`;
      if (assignedMovies.has(identity)) return false;
      assignedMovies.add(identity);
      return true;
    }).map((movie) => ({
      ...movie,
      poster_path: demoPosters[movie.title] || "",
    }));
    return catalog;
  }, {});
}

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [categoryMovies, setCategoryMovies] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      setLoading(true);
      setError("");
      const [data, catalog] = await Promise.all([getNowPlaying(), getCategoryCatalog()]);
      setAllMovies(data);
      const loadedCategoryMovies = catalog || getDemoCategoryCatalog();
      setCategoryMovies(loadedCategoryMovies);
      setMovies(activeCategory === "all" ? data : loadedCategoryMovies[activeCategory] || []);
      setIsSearching(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    if (!search.trim()) {
      loadMovies();
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await searchMovies(search.trim());
      setAllMovies(data);
      setMovies(filterMovies(data, activeCategory));
      setIsSearching(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setMovies(isSearching
      ? filterMovies(allMovies, category)
      : category === "all" ? allMovies : categoryMovies[category] || []);
  }

  function getVisibleSections() {
    const base = categories.slice(1);
    const selected = activeCategory === "all" ? base : base.filter((category) => category.key === activeCategory);

    return selected.map((category) => {
      return {
        ...category,
        movies: categoryMovies[category.key] || [],
      };
    });
  }

  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">ОТКРОЙ СВОЮ СЛЕДУЮЩУЮ ИСТОРИЮ</p>
          <h1>Мир кино<br /><span>начинается здесь.</span></h1>
          <p className="hero-description">
            Находи фильмы, открывай новые истории и выбирай, что посмотреть сегодня.
          </p>
          <a href="#movies" className="hero-button">Смотреть фильмы <span>↘</span></a>
        </div>
        <div className="hero-decoration">
          <div className="hero-circle">C</div>
          <span className="decoration-text">LIGHTS · CAMERA · ACTION</span>
        </div>
      </section>

      <section className="movies-section" id="movies">
        <div className="section-heading">
          <div>
            <p className="eyebrow">КАТАЛОГ CINEMA</p>
            <h2>{isSearching ? "Результаты поиска" : "Сейчас в кино"}</h2>
          </div>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Найти фильм..."
              aria-label="Найти фильм"
            />
            <button type="submit" aria-label="Поиск">⌕</button>
          </form>
        </div>

        <div className="category-list" aria-label="Категории фильмов">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              className={category.key === activeCategory ? "category-pill active" : "category-pill"}
              onClick={() => handleCategoryChange(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {isSearching && (
          <button className="reset-search" onClick={() => { setSearch(""); setActiveCategory("all"); loadMovies(); }}>
            ← Вернуться к фильмам в кино
          </button>
        )}

        {loading && <Loader />}
        {!loading && error && (
          <div className="error-box">
            <h3>Не удалось загрузить фильмы</h3>
            <p>{error}</p>
            <button onClick={loadMovies}>Повторить</button>
          </div>
        )}
        {!loading && !error && movies.length === 0 && (
          <p className="empty-state">Фильмы не найдены. Попробуй другое название.</p>
        )}
        {!loading && !error && activeCategory === "all" && !isSearching && (
          <div className="category-sections">
            {getVisibleSections().map((section) => (
              <section key={section.key} className="category-section">
                <div className="section-header">
                  <h3>{section.label} <span>({section.movies.length}/100)</span></h3>
                </div>
                <div className="movies-grid">
                  {section.movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                </div>
              </section>
            ))}
          </div>
        )}
        {!loading && !error && ((activeCategory !== "all") || isSearching) && movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
