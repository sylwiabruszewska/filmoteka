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
