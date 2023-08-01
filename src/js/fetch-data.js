import Notiflix from 'notiflix';
import noMoviePoster from '../images/no-poster-available.jpg';
import genresData from './genres.json';
import {
  addToLocalStorage,
  removeFromLocalStorage,
  checkMovieInLocalStorage,
} from './local-storage';

const galleryOfMovies = document.querySelector('.movie-gallery');
const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const MAIN_PAGE_PATH = '/trending/all/day';

async function fetchMovies(page) {
  const response = await fetch(`${BASE_URL}${MAIN_PAGE_PATH}?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return data;
}

async function renderMoviesCards(movies) {
  const markup = movies
    .map(
      ({ poster_path, title, name, genre_ids, id, media_type, release_date, first_air_date }) => {
        const movieGenres = getGenresNames(genre_ids);
        const releaseDate = (release_date || first_air_date || '').slice(0, 4);
        const movieTitle = title ? title : name;
        const moviePoster =
          poster_path != null ? `https://image.tmdb.org/t/p/w500${poster_path}` : noMoviePoster;
        return `
          <li class="movie-card" data-id="${id}" data-type="${media_type}" data-modal-open>
            <div class="movie-card__box">
              <img class="movie-card__img" src="${moviePoster}" data-img="${moviePoster}" loading="lazy" alt="${movieTitle}" />
            </div>
            <h2 class="movie-card__heading">${movieTitle}</h2>
            <span class="movie-card__caption">${movieGenres} | ${releaseDate}</span>
          </li>
          `;
      },
    )
    .join('');

  galleryOfMovies.innerHTML = markup;
  addModalListenerFunction(); // nasłuchiwanie na kliknięcia po załadowaniu elementów
}

const getGenresNames = genre_ids => {
  const genres = genresData.genres;
  return genre_ids
    .map(genreId => {
      const genre = genres.find(genre => genre.id === genreId);
      return genre ? genre.name : null;
    })
    .filter(genreName => genreName)
    .join(', ');
};

async function loadMovies(page) {
  try {
    Notiflix.Block.arrows('.is-loading', {
      svgSize: '80px',
      svgColor: '#ff6b08',
    });

    // Opóźnij renderowanie o 1sek - później skasować setTimeout
    setTimeout(async () => {
      const movies = await fetchMovies(page);
      renderMoviesCards(movies.results);
      Notiflix.Block.remove('.is-loading');
    }, 1000);
  } catch (error) {
    console.error(error);
    Notiflix.Block.remove('.is-loading');
  }
}

///////////////////////////////////
// FETCH MOVIE BY ID
///////////////////////////////////

async function fetchMovieById(movieId, type) {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${movieId}?api_key=${API_KEY}`);
    const responseObject = await response.json();
    return responseObject;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function addModalListenerFunction() {
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(movieCard => {
    movieCard.addEventListener('click', () => {
      addClickListenerToCards(movieCard.dataset.id, movieCard.dataset.type);
    });
  });
}

async function addClickListenerToCards(movieId, mediaType) {
  const backdrop = document.querySelector('.backdrop-movie');
  const modalCloseButton = document.querySelector('[data-modal-close]');
  const modalTitle = document.querySelector('.modal-movie__title');
  const modalPoster = document.querySelector('.modal-movie__poster');
  const modalVote = document.querySelector('.modal-movie__vote');
  const modalVoteCount = document.querySelector('.modal-movie__vote_count');
  const modalPopularity = document.querySelector('.modal-movie__popularity');
  const modalOriginalTitle = document.querySelector('.modal-movie__original-title');
  const modalGenre = document.querySelector('.modal-movie__genre');
  const modalDescription = document.querySelector('.modal-movie__text');

  Notiflix.Block.arrows('.modal-movie', {
    svgSize: '80px',
    svgColor: '#ff6b08',
    backgroundColor: '#ffffff',
  });

  // const movieId = card.dataset.id;
  // const mediaType = card.dataset.type;
  const movieData = await fetchMovieById(movieId, mediaType);
  const moviePoster =
    movieData.poster_path != null
      ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
      : noMoviePoster;

  // renderowanie danych
  modalTitle.textContent = movieData.title || movieData.name;
  modalPoster.src = `${moviePoster}`;
  modalVote.textContent = movieData.vote_average;
  modalVoteCount.textContent = movieData.vote_count;
  modalPopularity.textContent = movieData.popularity;
  modalOriginalTitle.textContent = movieData.original_title || movieData.original_name;
  const genreNames = movieData.genres.map(genre => genre.name).join(', ');
  modalGenre.textContent = genreNames;
  modalDescription.textContent = movieData.overview;
  Notiflix.Block.remove('.modal-movie');

  // otwórz modal
  backdrop.classList.remove('modal-movie-is-hidden');

  // zamknij modal po kliknięciu na btn close
  modalCloseButton.addEventListener('click', () => {
    backdrop.classList.add('modal-movie-is-hidden');
  });

  //MIKI dodaje kod do zamykania na ESC i clik poza modal

  const closeMovieModal = () => {
    backdrop.classList.add('modal-movie-is-hidden');
  };

  const closeMovieModalOnEsc = e => {
    if (e.key === 'Escape') {
      closeMovieModal();
    }
    window.removeEventListener('keydown', closeMovieModalOnEsc);
  };
  window.addEventListener('keydown', closeMovieModalOnEsc);

  backdrop.addEventListener('mousedown', onOutsideMovieModalClick);
  backdrop.addEventListener('click', onOutsideMovieModalClick);
  function onOutsideMovieModalClick(e) {
    if (e.target === backdrop) {
      closeMovieModal();
    }
    backdrop.removeEventListener('click', onOutsideMovieModalClick);
  }

  //////////////////// LOCAL STORAGE //////////////////////

  const watchedButton = document.createElement('button');
  watchedButton.className = 'modal-movie__btn-watched';
  watchedButton.textContent = 'Add to watched';

  const queueButton = document.createElement('button');
  queueButton.className = 'modal-movie__btn-queue';
  queueButton.textContent = 'Add to queue';

  const modalMovieBox = document.querySelector('.modal-movie__box');

  while (modalMovieBox.firstChild) {
    modalMovieBox.removeChild(modalMovieBox.firstChild);
  }

  modalMovieBox.appendChild(watchedButton);
  modalMovieBox.appendChild(queueButton);

  let isMovieInWatched;
  let isMovieInQueue;

  // Sprawdzenie, czy dany film znajduje się w localStorage
  isMovieInWatched = checkMovieInLocalStorage(movieData.id, 'watched');
  isMovieInQueue = checkMovieInLocalStorage(movieData.id, 'queue');

  watchedButton.textContent = isMovieInWatched ? 'ON THE WATCHED ✓' : 'Add to watched';
  queueButton.textContent = isMovieInQueue ? 'ON THE QUEUE ✓' : 'Add to queue';

  watchedButton.addEventListener('click', function () {
    if (isMovieInWatched) {
      removeFromLocalStorage(movieData.id, 'watched');
    } else {
      addToLocalStorage(movieData.id, 'watched');
    }

    isMovieInWatched = !isMovieInWatched;
    watchedButton.textContent = isMovieInWatched ? 'ADDED ✓' : 'Add to watched';
  });

  queueButton.addEventListener('click', function () {
    if (isMovieInQueue) {
      removeFromLocalStorage(movieData.id, 'queue');
    } else {
      addToLocalStorage(movieData.id, 'queue');
    }

    isMovieInQueue = !isMovieInQueue;
    queueButton.textContent = isMovieInQueue ? 'ADDED ✓' : 'Add to queue';
  });
}

export {
  fetchMovies,
  renderMoviesCards,
  getGenresNames,
  loadMovies,
  fetchMovieById,
  addModalListenerFunction,
  addClickListenerToCards,
};
