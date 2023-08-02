import { fetchMovies, loadMovies, renderMoviesCards } from './fetch-data.js';
import { fetchMoviesByTitle } from './search-movies.js';
import { updatePagination, normalizeBeforeAfterPages, currentPage } from './pagination';

let totalPages;
let movieTitle = null;

const searchBtn = document.querySelector('.search-form__button');
const input = document.querySelector('.search-form__input');

///////////////////////////////
// ŁADOWANIE POPULARNYCH FILMÓW
///////////////////////////////
document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchMovies(1);
  await loadMovies(1);
  totalPages = 500;
  normalizeBeforeAfterPages();
  updatePagination();
});

///////////////////////////////
// WYSZUKIWARKA FILMÓW
///////////////////////////////
async function searchMovies(e) {
  e.preventDefault();
  movieTitle = input.value.trim();
  const data = await fetchMoviesByTitle(1, movieTitle);
  renderMoviesCards(data.results);
  totalPages = data.total_pages;
  normalizeBeforeAfterPages(true);
  updatePagination();
}

searchBtn.addEventListener('click', searchMovies);

export { totalPages, movieTitle };
