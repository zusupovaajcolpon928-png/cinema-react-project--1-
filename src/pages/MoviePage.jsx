import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById, getBackdrop, getPoster, getThemeFallbackPoster, getTrailerUrl } from "../api/movieApi";
import Loader from "../components/Loader";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);
        setError("");
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="page-container error-box"><p>{error}</p><Link to="/">На главную</Link></div>;
  if (!movie) return null;

  const backdrop = getBackdrop(movie.backdrop_path);

  return (
    <div className="details-page">
      {backdrop && <div className="details-backdrop" style={{ backgroundImage: `url(${backdrop})` }} />}
      <div className="details-content page-container">
        <Link to="/" className="back-link">← Все фильмы</Link>
        <div className="details-layout">
          <img
            className="details-poster"
            src={getPoster(movie.poster_path || getThemeFallbackPoster(movie))}
            alt={movie.title}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = getThemeFallbackPoster(movie);
            }}
          />
          <div className="details-text">
            <p className="eyebrow">ИНФОРМАЦИЯ О ФИЛЬМЕ</p>
            <h1>{movie.title}</h1>
            {movie.original_title !== movie.title && <p className="original-title">{movie.original_title}</p>}
            <div className="details-meta">
              <span>★ {movie.vote_average?.toFixed(1) || "—"} / 10</span>
              <span>{movie.release_date || "Дата неизвестна"}</span>
              {movie.runtime ? <span>{movie.runtime} мин.</span> : null}
            </div>
            {movie.genres?.length > 0 && (
              <div className="genres">{movie.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)}</div>
            )}
            <h2>Описание</h2>
            <p className="overview">{movie.overview || "Описание пока недоступно."}</p>
            <div className="details-actions">
              <a
                href={getTrailerUrl(movie)}
                target="_blank"
                rel="noreferrer"
                className="trailer-button"
              >
                ▶ Смотреть трейлер
              </a>
            </div>
            {movie.production_countries?.length > 0 && (
              <p className="country">Страна: {movie.production_countries.map((item) => item.name).join(", ")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
