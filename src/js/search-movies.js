import { renderMoviesCards } from './fetch-data';

const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_MOVIE_PATH = `/search/movie`;
const galleryOfMovies = document.querySelector('.movie-gallery');
const input = document.querySelector('.search-form__input');
const searchBtn = document.querySelector('.search-form__button');
searchBtn.addEventListener('click', searchMovies);

let page = 1;

export async function searchMovies(e) {
  e.preventDefault();
  const response = await fetch(
    `${BASE_URL}${SEARCH_MOVIE_PATH}?api_key=${API_KEY}&page=${page}&query=${input.value}`,
  );
  const data = await response.json();
  clearInterfaceUI();
  renderMoviesCards(data.results);
  return (galleryOfMovies.innerHTML = data.query = '');
}

function clearInterfaceUI() {
  galleryOfMovies.innerHTML = '';
}
