import { addModalListenerFunction, getGenresNames } from './fetch-data';
import noMoviePoster from '../images/no-poster-available.jpg';
import Notiflix from 'notiflix';

const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_MOVIE_PATH = `/search/movie`;
const galleryOfMovies = document.querySelector('.movie-gallery');
const errorMsg = document.querySelector('.error-message');
const pagination = document.querySelector('.pagination');

async function fetchMoviesByTitle(page, movieTitle) {
  const response = await fetch(
    `${BASE_URL}${SEARCH_MOVIE_PATH}?api_key=${API_KEY}&page=${page}&query=${movieTitle}`,
  );
  const data = await response.json();
  return data;
}

async function loadMoviesFromInput(page, title) {
  try {
    Notiflix.Loading.arrows({
      svgSize: '80px',
      svgColor: '#ff6b08',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    });
    const data = await fetchMoviesByTitle(page, title);
    if (data.total_results === 0) {
      pagination.style.display = 'none';
      errorMsg.textContent = 'Search result not successful. Enter the correct movie name';
      errorMsg.style.display = 'flex';
      clearInterfaceUI();
    } else {
      pagination.style.display = 'flex';
      errorMsg.style.display = 'none';
      clearInterfaceUI();
      renderMoviesCardsFromInput(data.results);
    }
    Notiflix.Loading.remove();
  } catch (error) {
    console.error(error);
    Notiflix.Loading.remove();
  }
}

function clearInterfaceUI() {
  galleryOfMovies.innerHTML = '';
  Notiflix.Loading.arrows({
    svgColor: '#ff6b08',
  });
}

async function renderMoviesCardsFromInput(movies) {
  const markup = movies
    .map(({ poster_path, title, name, genre_ids, id, release_date, first_air_date }) => {
      const movieGenres = getGenresNames(genre_ids);
      const releaseDate = (release_date || first_air_date || '').slice(0, 4);
      const movieTitle = title ? title : name;
      const moviePoster =
        poster_path != null ? `https://image.tmdb.org/t/p/w500${poster_path}` : noMoviePoster;
      return `
          <li class="movie-card" data-id="${id}" data-type="movie" data-modal-open>
            <div class="movie-card__box">
              <img class="movie-card__img" src="${moviePoster}" data-img="${moviePoster}" loading="lazy" alt="${movieTitle}" />
            </div>
            <h2 class="movie-card__heading">${movieTitle}</h2>
            <span class="movie-card__caption">${movieGenres} | ${releaseDate}</span>
          </li>
          `;
    })
    .join('');

  galleryOfMovies.innerHTML = markup;
  addModalListenerFunction(); // nasłuchiwanie na kliknięcia po załadowaniu elementów
}

export { fetchMoviesByTitle, loadMoviesFromInput };
