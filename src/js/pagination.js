import { loadMovies } from './fetch-data.js';
import { loadMoviesFromInput } from './search-movies.js';
import { totalPages, movieTitle } from './app.js';

let currentPage = 1;

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

//HIDDEN
function hideElement(element) {
  element.classList.add('hidden');
}
function showElement(element) {
  element.classList.remove('hidden');
}

// SYLWIA - PAGINACJANA SZYBKO DO WYSZUKIWARKI FILMÓW
async function normalizeBeforeAfterPages(resetPages) {
  if (resetPages === true) {
    currentPage = 1;
  }

  if (currentPage === 1 && totalPages === 1) {
    hideElement(firstPage);
    hideElement(dotsPage);
    hideElement(prevPage1);
    hideElement(prevPage2);
    hideElement(nextPage1);
    hideElement(nextPage2);
    hideElement(dotsPageLast);
    hideElement(lastPage);
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
    updatePagination();
  }

  if (totalPages === 2) {
    if (currentPage === 1) {
      hideElement(firstPage);
      hideElement(dotsPage);
      hideElement(prevPage1);
      hideElement(prevPage2);
      hideElement(nextPage1);
      hideElement(nextPage2);
      hideElement(dotsPageLast);
      showElement(lastPage);
      if (movieTitle) {
        await loadMoviesFromInput(currentPage, movieTitle);
      } else {
        await loadMovies(currentPage);
      }
      updatePagination();
    }

    if (currentPage === 2) {
      showElement(firstPage);
      hideElement(dotsPage);
      hideElement(prevPage1);
      hideElement(prevPage2);
      hideElement(nextPage1);
      hideElement(nextPage2);
      hideElement(dotsPageLast);
      hideElement(lastPage);
      if (movieTitle) {
        await loadMoviesFromInput(currentPage, movieTitle);
      } else {
        await loadMovies(currentPage);
      }
      updatePagination();
    }
  }

  /////////////////////
  /////////////////////

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
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
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
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }

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
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
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
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
    updatePagination();
  }

  if (currentPage === totalPages - 7) {
    currentPage = currentPage;
    hideElement(firstPage);
    hideElement(dotsPage);
    hideElement(prevPage2);
    showElement(nextPage1);
    showElement(nextPage2);
    showElement(dotsPageLast);
    showElement(lastPage);
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
    updatePagination();
  }

  if (currentPage === totalPages - 6) {
    currentPage = currentPage;
    hideElement(dotsPage);
    hideElement(prevPage2);
    showElement(nextPage1);
    showElement(nextPage2);
    showElement(dotsPageLast);
    showElement(lastPage);
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
    updatePagination();
  }

  if (currentPage === totalPages - 5) {
    currentPage = currentPage;
    hideElement(dotsPage);
    showElement(nextPage1);
    showElement(nextPage2);
    showElement(dotsPageLast);
    showElement(lastPage);
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
    updatePagination();
  }

  if (currentPage === totalPages - 4) {
    currentPage = currentPage;
    showElement(nextPage1);
    showElement(nextPage2);
    showElement(dotsPageLast);
    showElement(lastPage);

    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
    updatePagination();
  }
  if (currentPage === totalPages - 3) {
    currentPage = currentPage;
    showElement(nextPage1);
    showElement(nextPage2);
    hideElement(dotsPageLast);
    showElement(lastPage);
    updatePagination();
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
  }
  if (currentPage === totalPages - 2) {
    currentPage = currentPage;

    showElement(nextPage1);
    hideElement(nextPage2);
    hideElement(dotsPageLast);
    showElement(lastPage);

    updatePagination();
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
  }
  if (currentPage === totalPages - 1) {
    currentPage = currentPage;

    hideElement(nextPage1);
    hideElement(nextPage2);
    hideElement(dotsPageLast);
    showElement(lastPage);
    updatePagination();
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
  }
  if (currentPage === totalPages) {
    currentPage = currentPage;

    hideElement(nextPage1);
    hideElement(nextPage2);
    hideElement(dotsPageLast);
    hideElement(lastPage);
    updatePagination();
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
  }

  if (totalPages >= 5 && currentPage >= 5) {
    showElement(firstPage);
    showElement(dotsPage);
    showElement(prevPage1);
    showElement(prevPage2);
    updatePagination();
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
  }

  ///////////////////////////////////////////
  // PAGINACJA ASI
  ///////////////////////////////////////////

  if (totalPages === 500) {
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
      if (movieTitle) {
        await loadMoviesFromInput(currentPage, movieTitle);
      } else {
        await loadMovies(currentPage);
      }
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
      if (movieTitle) {
        await loadMoviesFromInput(currentPage, movieTitle);
      } else {
        await loadMovies(currentPage);
      }
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
      if (movieTitle) {
        await loadMoviesFromInput(currentPage, movieTitle);
      } else {
        await loadMovies(currentPage);
      }
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
      if (movieTitle) {
        await loadMoviesFromInput(currentPage, movieTitle);
      } else {
        await loadMovies(currentPage);
      }
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
      if (movieTitle) {
        await loadMoviesFromInput(currentPage, movieTitle);
      } else {
        await loadMovies(currentPage);
      }
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
      if (movieTitle) {
        await loadMoviesFromInput(currentPage, movieTitle);
      } else {
        await loadMovies(currentPage);
      }
    }
  }
  ///////////////////////////////////////////
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
  if (currentPage < totalPages) {
    currentPage += 1;
    normalizeBeforeAfterPages();
  }
});

nextPage2.addEventListener('click', () => {
  if (currentPage < totalPages) {
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
async function changePage(newPage) {
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    if (movieTitle) {
      await loadMoviesFromInput(currentPage, movieTitle);
    } else {
      await loadMovies(currentPage);
    }
    normalizeBeforeAfterPages();
    updatePagination();
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

export { fetchTotalResults, updatePagination, runAsync, normalizeBeforeAfterPages, currentPage };
