import { loadMovies } from './fetch-data.js';
import { currentTotalResults } from './search-movies.js';

const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_POPULAR_PATH = '/movie/popular';

let currentPage = 1;
export let totalPages = 1;

// Funkcja wywołująca totalPages
async function fetchTotalResults() {
  try {
    const res = await fetch(`${BASE_URL}${MOVIE_POPULAR_PATH}?api_key=${API_KEY}`);
    const json = await res.json();
    let totalResults;
    if (currentTotalResults >= 1) {
      totalResults = currentTotalResults;
    } else {
      totalResults = json.total_results;
    }
    let results = json.results;
    if (totalResults > 10000) {
      totalResults = 10000;
    }
    let totalPages = Math.ceil(totalResults / results.length);
    return { currentPage: 1, totalPages };
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania filmów:', error);
    return { currentPage: 1, totalPages: 500 };
  }
}

async function runAsync() {
  const { currentPage: updatedCurrentPage, totalPages: updatedTotalPages } =
    await fetchTotalResults();
  currentPage = updatedCurrentPage;
  totalPages = updatedTotalPages;
}

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
  lastPage.textContent = totalPages;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

//Funkcja do odświeżania DOM wewnątrz event listenera
document.addEventListener('DOMContentLoaded', async () => {
  await runAsync();
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

export { fetchTotalResults, updatePagination, runAsync };
