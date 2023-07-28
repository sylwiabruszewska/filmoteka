import { loadMovies } from './fetch-data.js';

const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_POPULAR_PATH = '/movie/popular';

console.log('paginacja');

let totalPages = 500;
//let totalResults = sumMovieIds() / 20;;
let currentPage = 1;

//SZUKANIE TOTAL PAGES
function fetchMoviesID() {
  return fetch(`${BASE_URL}${MOVIE_POPULAR_PATH}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => data.results)
    .catch(error => {
      console.error('Wystąpił błąd podczas pobierania filmów:', error);
      return [];
    });
}

function sumMovieIds() {
  fetchMoviesID()
    .then(results => {
      const movieIds = results.map(movie => movie.id);
      const sum = movieIds.reduce((total, id) => total + id, 0);
      console.log('Suma ID filmów:', sum);
    })
    .catch(error => {
      console.error('Wystąpił błąd:', error);
    });
}

sumMovieIds();


//SZUKANIE ELEMENTÓW
const prevButton = document.querySelector('.arrow__left');
const firstPage = document.querySelector('.first');
const dotsPage = document.querySelector('.dots');
const prevPage2 = document.querySelector('.minus-2');
const prevPage1 = document.querySelector('.minus-1');
const currentPageElement = document.querySelector('.active');
const nextPage1 = document.querySelector('.plus-1');
const nextPage2 = document.querySelector('.plus-2');
const dotsPageLast = document.querySelector('.dots__last');
const lastPage = document.querySelector('.last');
const nextButton = document.querySelector('.arrow__right');

const galleryOfMovies = document.querySelector('.movie-gallery');

function updatePagination() {
  prevPage2.textContent = currentPage - 2;
  prevPage1.textContent = currentPage - 1;
  currentPageElement.textContent = currentPage;
  nextPage1.textContent = currentPage + 1;
  nextPage2.textContent = currentPage + 2;
  window.scrollTo(0, 0);
  console.log('update paginacji');
}

//Funkcja do odświeżania DOM wewnątrz event listenera
document.addEventListener('DOMContentLoaded', () => {
  loadMovies(currentPage);
  updatePagination();
});

//HIDDEN
function hideElement(element) {
  element.classList.add('hidden');
}
function showElement(element) {
  element.classList.remove('hidden');
}

//URUCHOMIENIE PIERWSZEJ STRONY
normalizeBeforeAfterPages();

//LOGIKA
function normalizeBeforeAfterPages() {
  if (currentPage === 1) {
    currentPage = 1;
    hideElement(firstPage);
    hideElement(dotsPage);
    hideElement(prevPage2);
    hideElement(prevPage1);
    showElement(nextPage1);
    showElement(nextPage2);
    showElement(dotsPageLast);
    showElement(lastPage);
    loadMovies(currentPage);

    updatePagination();
  }
  if (currentPage === 2) {
    currentPage = +2;
    hideElement(firstPage);
    hideElement(dotsPage);
    hideElement(prevPage2);
    showElement(prevPage1);
    showElement(nextPage1);
    showElement(nextPage2);
    showElement(dotsPageLast);
    showElement(lastPage);
    loadMovies(currentPage);

    updatePagination();
  }
  if (currentPage === 3) {
    currentPage = +3;
    hideElement(firstPage);
    hideElement(dotsPage);
    showElement(prevPage2);
    showElement(prevPage1);
    showElement(nextPage1);
    showElement(nextPage2);
    showElement(dotsPageLast);
    showElement(lastPage);
    loadMovies(currentPage);
    console.log('strona 3 NORM');
    updatePagination();
  }
  if (currentPage === 4) {
    currentPage = +4;
    showElement(firstPage);
    hideElement(dotsPage);
    showElement(prevPage2);
    showElement(prevPage1);
    showElement(nextPage1);
    showElement(nextPage2);
    showElement(dotsPageLast);
    showElement(lastPage);
    loadMovies(currentPage);
    console.log('strona 4 NORM');
    updatePagination();
  }
  if (currentPage <= totalPages - 5 && currentPage > 4) {
    currentPage = currentPage;
    showElement(firstPage);
    showElement(dotsPage);
    showElement(prevPage2);
    showElement(prevPage1);
    showElement(nextPage1);
    showElement(nextPage2);
    showElement(dotsPageLast);
    showElement(lastPage);
    loadMovies(currentPage);
    console.log('strona od 5 do 495 NORM');
    updatePagination();
  }

  if (currentPage === totalPages - 4 && currentPage > 4) {
    currentPage = currentPage;
    showElement(firstPage);
    showElement(dotsPage);
    showElement(prevPage1);
    showElement(prevPage2);
    showElement(nextPage1);
    showElement(nextPage2);
    showElement(dotsPageLast);
    showElement(lastPage);
    loadMovies(currentPage);
    console.log('strona 496 NORM');
    updatePagination();
  }
  if (currentPage === totalPages - 3 && currentPage > 8) {
    currentPage = currentPage;
    showElement(firstPage);
    showElement(dotsPage);
    showElement(prevPage1);
    showElement(prevPage2);
    showElement(nextPage1);
    showElement(nextPage2);
    hideElement(dotsPageLast);
    showElement(lastPage);
    updatePagination();
    loadMovies(currentPage);
    console.log('strona 497 NORM');
  }
  if (currentPage === totalPages - 2 && currentPage > 8) {
    currentPage = currentPage;
    showElement(firstPage);
    showElement(dotsPage);
    showElement(prevPage1);
    showElement(prevPage2);
    showElement(nextPage1);
    showElement(nextPage2);
    hideElement(dotsPageLast);
    hideElement(lastPage);
    updatePagination();
    loadMovies(currentPage);
    console.log('strona 498 NORM');
  }
  if (currentPage === totalPages - 1 && currentPage > 8) {
    currentPage = currentPage;
    showElement(firstPage);
    showElement(dotsPage);
    showElement(prevPage1);
    showElement(prevPage2);
    showElement(nextPage1);
    hideElement(nextPage2);
    hideElement(dotsPageLast);
    hideElement(lastPage);
    updatePagination();
    loadMovies(currentPage);
    console.log('strona 499 NORM');
  }
  if (currentPage === totalPages && currentPage > 8) {
    currentPage = currentPage;
    showElement(firstPage);
    showElement(dotsPage);
    showElement(prevPage1);
    showElement(prevPage2);
    hideElement(nextPage1);
    hideElement(nextPage2);
    hideElement(dotsPageLast);
    hideElement(lastPage);
    updatePagination();
    loadMovies(currentPage);
    console.log('strona 500 NORM');
  }
}

//EVENT LISTENER
firstPage.addEventListener('click', () => {
  if ((currentPage = 1)) {
    normalizeBeforeAfterPages();
  }
});

lastPage.addEventListener('click', () => {
  if ((currentPage = totalPages)) {
    normalizeBeforeAfterPages();
  }
});

prevPage2.addEventListener('click', () => {
  if (currentPage > 2) {
    currentPage -= 2;
    normalizeBeforeAfterPages();
  }
});

prevPage1.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    normalizeBeforeAfterPages();
  }
});

nextPage1.addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage += 1;
    normalizeBeforeAfterPages();
  }
});

nextPage2.addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage += 2;
    normalizeBeforeAfterPages();
  }
});

//STRZAŁKI
prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    normalizeBeforeAfterPages();
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage += 1;
    normalizeBeforeAfterPages();
  }
});

//PAGINACJA KLAWIATURA
function changePage(newPage) {
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    loadMovies(currentPage);
    normalizeBeforeAfterPages();
    updatePagination();
    scrollToTop(); //
  }
}

document.addEventListener('keydown', event => {
  const key = event.key;
  if (key === 'ArrowLeft') {
    changePage(currentPage - 1);
  } else if (key === 'ArrowRight') {
    changePage(currentPage + 1);
  }
});
