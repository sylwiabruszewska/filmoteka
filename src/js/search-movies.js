import { addModalListenerFunction, getGenresNames } from './fetch-data';
import noMoviePoster from '../images/no-poster-available.jpg';
import { updatePagination, fetchTotalResults, runAsync } from './pagination'; // totalPages,
import debounce from 'lodash.debounce';

import { Loading } from 'notiflix/build/notiflix-loading-aio';

const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_MOVIE_PATH = `/search/movie`;
const galleryOfMovies = document.querySelector('.movie-gallery');
const input = document.querySelector('.search-form__input');
const searchBtn = document.querySelector('.search-form__button');
const errorMsg = document.querySelector('.error-message');

searchBtn.addEventListener('click', searchMovies);

// import debounce from 'lodash.debounce';
// const DEBOUNCE_DELAY = 300;
// input.addEventListener('input', debounce(searchMovies, DEBOUNCE_DELAY));
///// Funkcja wyszukiwania przy wpisywaniu, jeśli nie będzie potrzebna to ją usunę.

let searchResultPage = 1;
export let currentTotalResults = 0; //paginacja

export async function searchMovies(e) {
  e.preventDefault();
  const response = await fetch(
    `${BASE_URL}${SEARCH_MOVIE_PATH}?api_key=${API_KEY}&page=${searchResultPage}&query=${input.value}`,
  );
  const data = await response.json();
  fetchTotalResults(); //paginacja
  currentTotalResults = data.total_results; //paginacja
  totalPages = Math.ceil(data.total_results / data.results.length); //paginacja
  updatePagination(); //paginacja
  runAsync(); //paginacja
  if (input.value === '') {
    errorMsg.style.display = 'flex';
    errorMsg.textContent = 'What are we looking for?';
    return;
  } else {
    errorMsg.textContent = 'Search result not successful. Enter the correct movie name';
  }
  clearInterfaceUI();

  renderMoviesCardsfromInput(data.results);
  Loading.remove();
  if (data.results == 0) {
    errorMsg.style.display = 'flex';
  } else {
    errorMsg.style.display = 'none';
  }
  return;
}

function clearInterfaceUI() {
  galleryOfMovies.innerHTML = '';
  Loading.arrows({
    svgColor: '#ff6b08',
  });
}

async function renderMoviesCardsfromInput(movies) {
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
