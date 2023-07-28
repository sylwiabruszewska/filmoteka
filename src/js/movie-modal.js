// Import funkcji getPosterLink z pliku './poster'
import { getPosterLink } from './poster';

function createModal(movie) {
  const modalMovieEl = document.querySelector('.modal-movie');
  const backdrop = document.querySelector('.backdrop-movie');

  const modalMoviePosterBox = modalMovieEl.querySelector('.modal-movie__poster-box');
  const moviePoster = modalMoviePosterBox.querySelector('.modal-movie__poster');
  const closeModalBtn = modalMovieEl.querySelector('.modal-movie__btn-close');
  const modalMovieTitle = modalMovieEl.querySelector('.modal-movie__title');
  const modalMovieVote = modalMovieEl.querySelector('.modal-movie__vote');
  const modalMovieVoteCount = modalMovieEl.querySelector(
    '.modal-movie__item--value span:nth-child(2)',
  );
  const modalMoviePopularity = modalMovieEl.querySelector('.modal-movie__popularity');
  const modalMovieOriginalTitle = modalMovieEl.querySelector('.modal-movie__original-title');
  const modalMovieGenre = modalMovieEl.querySelector('.modal-movie__genre');
  const modalMovieDescription = modalMovieEl.querySelector('.modal-movie__text');
  const modalMovieBtnWatched = modalMovieEl.querySelector('.modal-movie__btn-watched');
  const modalMovieBtnQueue = modalMovieEl.querySelector('.modal-movie__btn-queue');
  const modalMovieBtnTrailer = modalMovieEl.querySelector('.modal-movie__btn-trailer');

  moviePoster.src = getPosterLink(movie);
  moviePoster.alt = movie.original_title;
  modalMovieTitle.textContent = movie.title;
  modalMovieVote.textContent = movie.vote_average.toFixed(1);
  modalMovieVoteCount.textContent = movie.vote_count;
  modalMoviePopularity.textContent = movie.popularity.toFixed(1);
  modalMovieOriginalTitle.textContent = movie.original_title;
  modalMovieGenre.textContent = movie.genres;
  modalMovieDescription.textContent = movie.overview;

  modalMovieBtnWatched.setAttribute('data-movie', encodeURIComponent(JSON.stringify(movie)));
  modalMovieBtnQueue.setAttribute('data-movie', encodeURIComponent(JSON.stringify(movie)));
  modalMovieBtnTrailer.setAttribute('data-id', movie.id);
  modalMovieBtnTrailer.setAttribute('data-btn', 'watchTrailer');

  // closeModalBtn.addEventListener('click', () => {
  //   closeBackdrop();
  // });

  // backdrop.addEventListener('click', event => {
  //   if (event.target === backdrop) {
  //     closeBackdrop();
  //   }
  // });

  // document.addEventListener('keydown', event => {
  //   if (event.key === 'Escape') {
  //     closeBackdrop();
  //   }
  // });

  function closeBackdrop() {
    // backdrop.classList.add('is-hidden');
  }
}

function openModal(movie) {
  // createModal(movie);
  // const backdrop = document.querySelector('.backdrop');
  // backdrop.classList.remove('is-hidden');
}

export { openModal };
