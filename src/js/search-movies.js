import { renderMoviesCards } from './fetch-data';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_MOVIE_PATH = `/search/movie`;
const galleryOfMovies = document.querySelector('.movie-gallery');
const input = document.querySelector('.search-form__input');
const searchBtn = document.querySelector('.search-form__button');
const errorMsg = document.querySelector('.error-message');

searchBtn.addEventListener('click', searchMovies);

input.addEventListener('input', debounce(searchMovies, DEBOUNCE_DELAY));

let searchResultPage = 1;

export async function searchMovies(e) {
  e.preventDefault();
  const response = await fetch(
    `${BASE_URL}${SEARCH_MOVIE_PATH}?api_key=${API_KEY}&page=${searchResultPage}&query=${input.value}`,
  );
  const data = await response.json();
  clearInterfaceUI();
  renderMoviesCards(data.results);
  galleryOfMovies.innerHTML = data.query = '';
  if (data.results == 0) {
    errorMsg.style.display = 'flex';
  } else {
    errorMsg.style.display = 'none';
  }
  return;
}

function clearInterfaceUI() {
  galleryOfMovies.innerHTML = '';
}
