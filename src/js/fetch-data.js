import Notiflix from 'notiflix';
import noMoviePoster from '../images/no-poster-available.jpg';

const galleryOfMovies = document.querySelector('.movie-gallery');
const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const MAIN_PAGE_PATH = '/trending/all/day';
const GENRE_LIST_PATH = `/genre/movie/list`;

let page = 1;

async function fetchMovies(page) {
  const response = await fetch(`${BASE_URL}${MAIN_PAGE_PATH}?api_key=${API_KEY}&page=${page}`);
  const fetchMovies = await response.json();
  console.log(fetchMovies.results);
  return fetchMovies.results;
}

async function renderMoviesCards(movies) {
  const genres = await fetchGenres();

  const markup = movies
    .map(({ poster_path, title, name, genre_ids, release_date, first_air_date }) => {
      const movieGenres = genre_ids
        .map(genreId => {
          const genre = genres.find(genre => genre.id === genreId);
          return genre ? genre.name : null;
        })
        .filter(genreName => genreName)
        .join(', ');

      const releaseDate = (release_date || first_air_date || '').slice(0, 4);
      const movieTitle = title ? title : name;
      const moviePoster =
        poster_path != null ? `https://image.tmdb.org/t/p/w500${poster_path}` : noMoviePoster;
      return `
        <li class="movie-card">
            <img class="movie-card__img" src="${moviePoster}" loading="lazy" alt="${movieTitle}" />
          <h2 class="movie-card__heading">${movieTitle}</h2>
          <span class="movie-card__caption">${movieGenres} | ${releaseDate}</span>
        </li>
        `;
    })
    .join('');

  return galleryOfMovies.insertAdjacentHTML('beforeend', markup);
}

async function fetchGenres() {
  const response = await fetch(`${BASE_URL}/${GENRE_LIST_PATH}?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
}

async function loadMovies(page) {
  try {
    Notiflix.Block.arrows('.movie-gallery', {
      svgSize: '80px',
      svgColor: '#ff6b08',
    });

    // Opóźnij renderowanie o 2 sekundy - później skasować setTimeout
    setTimeout(async () => {
      const movies = await fetchMovies(page);
      renderMoviesCards(movies);
      Notiflix.Block.remove('.movie-gallery');
    }, 2000);
  } catch (error) {
    console.error(error);
    Notiflix.Block.remove('.movie-gallery');
  }
}

loadMovies(page);

export { fetchMovies, renderMoviesCards, fetchGenres };
