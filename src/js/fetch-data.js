import Notiflix from 'notiflix';
import noMoviePoster from '../images/no-poster-available.jpg';

import generatePagination from './pagination.js';

const galleryOfMovies = document.querySelector('.movie-gallery');
const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const MAIN_PAGE_PATH = '/trending/all/day';
const GENRE_LIST_PATH = `/genre/movie/list`;

// let page = 1;

async function fetchMovies(page) {
  const response = await fetch(`${BASE_URL}${MAIN_PAGE_PATH}?api_key=${API_KEY}&page=${page}`);
  const fetchMovies = await response.json();
  // console.log(fetchMovies);
  return fetchMovies.results;
}

async function renderMoviesCards(movies) {
  const genres = await fetchGenres();

  const markup = movies
    .map(({ poster_path, title, name, genre_ids, id, release_date, first_air_date }) => {
      if (poster_path === null) {
        return;
      }
      const movieGenres = genre_ids
        .map(genreId => {
          const genre = genres.find(genre => genre.id === genreId);
          return genre ? genre.name : null;
        })
        .filter(genreName => genreName)
        .join(', ');

      // console.log(id);
      const releaseDate = (release_date || first_air_date || '').slice(0, 4);
      const movieTitle = title ? title : name;
      const moviePoster =
        poster_path != null ? `https://image.tmdb.org/t/p/w500${poster_path}` : noMoviePoster;
      return `
          <li class="movie-card" data-id="${id}" data-modal-open>
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

async function fetchGenres() {
  const response = await fetch(`${BASE_URL}/${GENRE_LIST_PATH}?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
}

async function loadMovies(page) {
  try {
    Notiflix.Block.arrows('.is-loading', {
      svgSize: '80px',
      svgColor: '#ff6b08',
    });

    // Opóźnij renderowanie o 2 sekundy - później skasować setTimeout
    setTimeout(async () => {
      const movies = await fetchMovies(page);
      renderMoviesCards(movies);
      // generatePagination();
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

async function fetchMovieById(movieId) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const responseObject = await response.json();
    // console.log(responseObject);
    return responseObject;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function addModalListenerFunction() {
  const movieCards = document.querySelectorAll('.movie-card');
  // console.log('znalezione elementy LI:', movieCards.length);
  addClickListenerToCards(movieCards);
}

// PIERWSZA WERSJA Z CONSOLE LOG
// function addClickListenerToCards(cards) {
//   cards.forEach(card => {
//     card.addEventListener('click', async () => {
//       const movieId = card.dataset.id;
//       const movieData = await fetchMovieById(movieId);
//       console.log('Movie ID:', movieData.id); // Wyświetl ID filmu w konsoli
//       console.log('Poster Path:', movieData.poster_path);
//       console.log('Votes:', movieData.vote_count);
//       console.log('Popularity:', movieData.popularity);
//       console.log('Original Title:', movieData.original_title || movieData.original_name);
//       const genreNames = movieData.genres.map(genre => genre.name).join(', ');
//       console.log('Genre:', genreNames);
//       console.log('Description:', movieData.overview);
//     });
//   });
// }

async function addClickListenerToCards(cards) {
  const backdrop = document.querySelector('.backdrop-movie');
  const modalMovie = document.querySelector('.modal-movie');
  const modalCloseButton = document.querySelector('[data-modal-close]');
  const modalTitle = document.querySelector('.modal-movie__title');
  const modalPoster = document.querySelector('.modal-movie__poster');
  const modalVote = document.querySelector('.modal-movie__vote');
  // const modalVoteCount = document.querySelector('.modal-movie__vote-count');
  const modalPopularity = document.querySelector('.modal-movie__popularity');
  const modalOriginalTitle = document.querySelector('.modal-movie__original-title');
  const modalGenre = document.querySelector('.modal-movie__genre');
  const modalDescription = document.querySelector('.modal-movie__text');

  cards.forEach(card => {
    card.addEventListener('click', async () => {
      Notiflix.Block.arrows('.modal-movie', {
        svgSize: '80px',
        svgColor: '#ff6b08',
        backgroundColor: '#ffffff',
      });

      const movieId = card.dataset.id;
      // console.log(movieId);
      const movieData = await fetchMovieById(movieId);

      // renderowanie danych
      modalTitle.textContent = movieData.title || movieData.name;
      modalPoster.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
      modalVote.textContent = movieData.vote_average;
      // modalVoteCount.textContent = movieData.vote_count;
      modalPopularity.textContent = movieData.popularity;
      modalOriginalTitle.textContent = movieData.original_title || movieData.original_name;
      const genreNames = movieData.genres.map(genre => genre.name).join(', ');
      modalGenre.textContent = genreNames;
      modalDescription.textContent = movieData.overview;
      Notiflix.Block.remove('.modal-movie');

      // otwórz modal
      backdrop.classList.remove('modal-movie-is-hidden');
      // console.log(backdrop);

      // zamknij modal po kliknięciu na btn close
      modalCloseButton.addEventListener('click', () => {
        backdrop.classList.add('modal-movie-is-hidden');
      });
    });
  });
}

//// WYKOMENTOWAĆ PRZY PAGINACJI ////////
// document.addEventListener('DOMContentLoaded', async () => {
//   await loadMovies(page);
// });

// fetchMovieById(615);

export {
  fetchMovies,
  renderMoviesCards,
  fetchGenres,
  loadMovies,
  fetchMovieById,
  addModalListenerFunction,
  addClickListenerToCards,
};
