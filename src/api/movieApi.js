const API_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.REACT_APP_TMDB_TOKEN;
const DEFAULT_POSTER_URL = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80";
const DEFAULT_BACKDROP_URL = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80";
const CATEGORY_DISCOVERY = [
  { key: "animation", params: { with_genres: "16" } },
  { key: "drama", params: { with_original_language: "ko", with_genres: "10749" } },
  { key: "horror", params: { with_genres: "27" } },
  { key: "comedy", params: { with_genres: "35" } },
];

const CATEGORY_MOVIE_LIMIT = 100;
const INITIAL_DISCOVERY_PAGES = 5;

const FALLBACK_MOVIES = [
  {
    id: 1,
    title: "Inception",
    original_title: "Inception",
    overview:
      "A thief who steals corporate secrets through dreams is given a chance to erase his past by planting an idea in a CEO's mind.",
    release_date: "2010-07-16",
    vote_average: 8.4,
    poster_path: "",
    backdrop_path: "",
    runtime: 148,
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Sci-Fi" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 2,
    title: "The Dark Knight",
    original_title: "The Dark Knight",
    overview:
      "Batman faces the Joker, a criminal mastermind whose chaotic plans push Gotham to its limits.",
    release_date: "2008-07-18",
    vote_average: 9.0,
    poster_path: "",
    backdrop_path: "",
    runtime: 152,
    genres: [{ id: 28, name: "Action" }, { id: 80, name: "Crime" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 3,
    title: "Interstellar",
    original_title: "Interstellar",
    overview:
      "A team of explorers travels through a wormhole in search of a new home for humanity.",
    release_date: "2014-11-07",
    vote_average: 8.7,
    poster_path: "",
    backdrop_path: "",
    runtime: 169,
    genres: [{ id: 878, name: "Sci-Fi" }, { id: 18, name: "Drama" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 4,
    title: "Avatar",
    original_title: "Avatar",
    overview:
      "A paraplegic marine becomes part of an alien world and finds a new purpose on Pandora.",
    release_date: "2009-12-18",
    vote_average: 7.9,
    poster_path: "",
    backdrop_path: "",
    runtime: 162,
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Sci-Fi" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 5,
    title: "Dune",
    original_title: "Dune",
    overview:
      "A noble family becomes embroiled in a war for the most valuable substance in the universe.",
    release_date: "2021-10-22",
    vote_average: 8.0,
    poster_path: "",
    backdrop_path: "",
    runtime: 155,
    genres: [{ id: 878, name: "Sci-Fi" }, { id: 12, name: "Adventure" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 6,
    title: "Spider-Man: Across the Spider-Verse",
    original_title: "Spider-Man: Across the Spider-Verse",
    overview:
      "Miles Morales embarks on a new adventure across the multiverse with a team of Spider-People.",
    release_date: "2023-06-02",
    vote_average: 8.5,
    poster_path: "",
    backdrop_path: "",
    runtime: 140,
    genres: [{ id: 28, name: "Action" }, { id: 16, name: "Animation" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 7,
    title: "The Matrix",
    original_title: "The Matrix",
    overview:
      "A hacker learns reality is a simulation and joins a rebellion against the machines.",
    release_date: "1999-03-31",
    vote_average: 8.7,
    poster_path: "",
    backdrop_path: "",
    runtime: 136,
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Sci-Fi" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 8,
    title: "Titanic",
    original_title: "Titanic",
    overview:
      "A shy artist and a wealthy traveler find love aboard the doomed RMS Titanic.",
    release_date: "1997-12-19",
    vote_average: 7.9,
    poster_path: "",
    backdrop_path: "",
    runtime: 195,
    genres: [{ id: 18, name: "Drama" }, { id: 10749, name: "Romance" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 9,
    title: "The Godfather",
    original_title: "The Godfather",
    overview:
      "An aging patriarch of a powerful crime family transfers control to his reluctant son.",
    release_date: "1972-03-24",
    vote_average: 8.7,
    poster_path: "",
    backdrop_path: "",
    runtime: 175,
    genres: [{ id: 80, name: "Crime" }, { id: 18, name: "Drama" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 10,
    title: "Pulp Fiction",
    original_title: "Pulp Fiction",
    overview:
      "A hitman, a boxer, and a pair of thieves cross paths in a series of interwoven stories.",
    release_date: "1994-10-14",
    vote_average: 8.5,
    poster_path: "",
    backdrop_path: "",
    runtime: 154,
    genres: [{ id: 80, name: "Crime" }, { id: 53, name: "Thriller" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 11,
    title: "The Shawshank Redemption",
    original_title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men form a bond and find hope through acts of courage and friendship.",
    release_date: "1994-10-14",
    vote_average: 9.3,
    poster_path: "",
    backdrop_path: "",
    runtime: 142,
    genres: [{ id: 18, name: "Drama" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 12,
    title: "La La Land",
    original_title: "La La Land",
    overview:
      "A jazz pianist and an aspiring actress fall in love while chasing their dreams in Los Angeles.",
    release_date: "2016-12-09",
    vote_average: 8.0,
    poster_path: "",
    backdrop_path: "",
    runtime: 128,
    genres: [{ id: 18, name: "Drama" }, { id: 10402, name: "Music" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 13,
    title: "Whiplash",
    original_title: "Whiplash",
    overview:
      "An ambitious drummer is pushed to the brink by an unforgiving music teacher.",
    release_date: "2014-10-10",
    vote_average: 8.5,
    poster_path: "",
    backdrop_path: "",
    runtime: 106,
    genres: [{ id: 18, name: "Drama" }, { id: 10402, name: "Music" }],
    production_countries: [{ name: "USA" }],
  },
  {
    id: 14,
    title: "Parasite",
    original_title: "기생충",
    overview:
      "A poor family schemes to infiltrate a wealthy household, but events spiral out of control.",
    release_date: "2019-05-30",
    vote_average: 8.5,
    poster_path: "",
    backdrop_path: "",
    runtime: 132,
    genres: [{ id: 35, name: "Comedy" }, { id: 53, name: "Thriller" }],
    production_countries: [{ name: "South Korea" }],
  },
  {
    id: 15,
    title: "Mad Max: Fury Road",
    original_title: "Mad Max: Fury Road",
    overview:
      "In a post-apocalyptic wasteland, a drifter and a rebel warrior battle for survival.",
    release_date: "2015-05-15",
    vote_average: 8.1,
    poster_path: "",
    backdrop_path: "",
    runtime: 120,
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }],
    production_countries: [{ name: "Australia" }],
  },
  {
    id: 16,
    title: "Jurassic Park",
    original_title: "Jurassic Park",
    overview:
      "A theme park filled with cloned dinosaurs becomes a deadly place for visitors and scientists.",
    release_date: "1993-06-11",
    vote_average: 8.2,
    poster_path: "",
    backdrop_path: "",
    runtime: 127,
    genres: [{ id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    production_countries: [{ name: "USA" }],
  },
];

function normalizeText(value = "") {
  return String(value).trim().toLowerCase();
}

export function getThemeFallbackPoster(movie = {}) {
  const title = String(movie?.title || movie?.original_title || "Фильм");
  const safeTitle = title.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  })[character]);
  const palette = movie?.original_language === "ko"
    ? ["#173b3b", "#e4b46a"]
    : ["#202735", "#d39b68"];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750"><rect width="500" height="750" fill="${palette[0]}"/><path d="M0 500 500 300v450H0z" fill="#10151d" opacity=".55"/><circle cx="390" cy="150" r="100" fill="${palette[1]}" opacity=".22"/><text x="40" y="610" fill="${palette[1]}" font-family="Georgia,serif" font-size="18" letter-spacing="3">ПОСТЕР НЕ НАЙДЕН</text><text x="40" y="670" fill="#fff" font-family="Arial,sans-serif" font-size="30" font-weight="700">${safeTitle.slice(0, 36)}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function withFallbackImages(movie) {
  const poster = movie.poster_path || getThemeFallbackPoster(movie);
  const backdrop = movie.backdrop_path || DEFAULT_BACKDROP_URL;

  return {
    ...movie,
    poster_path: poster,
    backdrop_path: backdrop,
  };
}

function getFallbackMoviesByQuery(query) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return FALLBACK_MOVIES.map(withFallbackImages);
  }

  return FALLBACK_MOVIES.filter((movie) => {
    const searchable = [
      movie.title,
      movie.original_title,
      movie.overview,
      movie.release_date,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  }).map(withFallbackImages);
}

async function request(endpoint) {
  if (!TOKEN) {
    throw new Error("Добавь TMDB Read Access Token в файл .env");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("TMDB token недействителен. Проверь файл .env");
    }
    throw new Error("Не удалось загрузить данные. Попробуй ещё раз.");
  }

  return response.json();
}

async function getDiscoverPage(category, page) {
  const params = new URLSearchParams({
    language: "ru-RU",
    sort_by: "popularity.desc",
    include_adult: "false",
    page: String(page),
    ...category.params,
  });
  return request(`/discover/movie?${params.toString()}`);
}

function getMovieIdentity(movie) {
  const title = normalizeText(movie.title || movie.original_title);
  const year = String(movie.release_date || "").slice(0, 4);
  return `${title}-${year}`;
}

export async function getCategoryCatalog() {
  if (!TOKEN) return null;

  const candidateGroups = await Promise.all(CATEGORY_DISCOVERY.map(async (category) => {
    const pages = await Promise.all(
      Array.from({ length: INITIAL_DISCOVERY_PAGES }, (_, index) => getDiscoverPage(category, index + 1))
    );
    return {
      category,
      movies: pages.flatMap((page) => page.results || []),
      totalPages: pages[0]?.total_pages || 0,
    };
  }));

  const assignedMovies = new Set();
  const catalog = {};

  for (const { category, movies, totalPages } of candidateGroups) {
    const selectedMovies = [];
    const categoryMovies = new Set();

    function addUnassignedMovies(candidates) {
      for (const movie of candidates) {
        const identity = getMovieIdentity(movie);
        if (!identity || assignedMovies.has(identity) || categoryMovies.has(identity)) continue;

        categoryMovies.add(identity);
        selectedMovies.push(movie);
        if (selectedMovies.length === CATEGORY_MOVIE_LIMIT) break;
      }
    }

    addUnassignedMovies(movies);

    for (let page = INITIAL_DISCOVERY_PAGES + 1; selectedMovies.length < CATEGORY_MOVIE_LIMIT && page <= totalPages; page += 1) {
      const data = await getDiscoverPage(category, page);
      addUnassignedMovies(data.results || []);
    }

    selectedMovies.forEach((movie) => assignedMovies.add(getMovieIdentity(movie)));
    catalog[category.key] = selectedMovies.map(withFallbackImages);
  }

  return catalog;
}

export async function getNowPlaying(page = 1) {
  if (!TOKEN) {
    const start = (page - 1) * 20;
    return FALLBACK_MOVIES.slice(start, start + 20).map(withFallbackImages);
  }

  const data = await request(
    `/movie/now_playing?language=ru-RU&page=${page}`
  );
  return data.results || [];
}

export async function getMovieById(id) {
  if (!TOKEN) {
    const movie = FALLBACK_MOVIES.find((item) => String(item.id) === String(id));

    if (!movie) {
      throw new Error("Фильм не найден");
    }

    return withFallbackImages(movie);
  }

  return request(`/movie/${id}?language=ru-RU`);
}

export async function searchMovies(query) {
  if (!TOKEN) {
    return getFallbackMoviesByQuery(query);
  }

  const data = await request(
    `/search/movie?query=${encodeURIComponent(query)}&language=ru-RU&page=1&include_adult=false`
  );
  return data.results || [];
}

export function getPoster(path) {
  if (!path) {
    return DEFAULT_POSTER_URL;
  }

  if (path.startsWith("http") || path.startsWith("data:")) {
    return path;
  }

  return `https://image.tmdb.org/t/p/w500${path}`;
}

export function getBackdrop(path) {
  if (!path) {
    return DEFAULT_BACKDROP_URL;
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `https://image.tmdb.org/t/p/w1280${path}`;
}

export function getTrailerUrl(movie) {
  const title = movie?.title || movie?.original_title || "movie";
  const year = movie?.release_date ? movie.release_date.slice(0, 4) : "";
  const query = `${title} ${year} official trailer`.trim();

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
