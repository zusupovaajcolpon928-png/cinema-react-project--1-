import { Link } from "react-router-dom";
import { getPoster, getThemeFallbackPoster, getTrailerUrl } from "../api/movieApi";

function MovieCard({ movie }) {
  const posterSrc = getPoster(movie.poster_path || getThemeFallbackPoster(movie));

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="poster-wrap">
          <img
            src={posterSrc}
            alt={movie.title}
            className="movie-poster"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = getThemeFallbackPoster(movie);
            }}
          />
          <span className="rating">
            ★ {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
          </span>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date || "Дата неизвестна"}</p>
        </div>
      </Link>
      <a
        href={getTrailerUrl(movie)}
        target="_blank"
        rel="noreferrer"
        className="movie-trailer-link"
      >
        ▶ Трейлер
      </a>
    </div>
  );
}

export default MovieCard;
