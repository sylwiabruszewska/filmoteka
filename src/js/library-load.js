import { addModalListenerFunction, fetchMovieById } from './fetch-data';
import noMoviePoster from '../images/no-poster-available.jpg';
import genresData from './genres.json';

const libraryGallery = document.querySelector('.library-gallery');

const btnWatched = document.querySelector('.btn-watched');
const btnQueue = document.querySelector('.btn-queue');

btnWatched.addEventListener('click', () => {
  const watchedMoviesArray = JSON.parse(localStorage.getItem('watched'));
  if (watchedMoviesArray) {
    loadMovies(watchedMoviesArray);
    btnWatched.classList.add('opened');
    btnQueue.classList.remove('opened');
  } else {
    console.log('brak zapisanych filmów na tablicy Watched Movies');
    btnWatched.classList.add('opened');
    btnQueue.classList.remove('opened');
  }
});

btnQueue.addEventListener('click', () => {
  const queueMoviesArray = JSON.parse(localStorage.getItem('queue'));
  if (queueMoviesArray) {
    loadMovies(queueMoviesArray);
    btnQueue.classList.add('opened');
    btnWatched.classList.remove('opened');
  } else {
    console.log('brak zapisanych filmów na tablicy Queue');
    btnQueue.classList.add('opened');
    btnWatched.classList.remove('opened');
  }
});

async function loadMovies(movieIds) {
  try {
    const results = [];
    for (const movieId of movieIds) {
      const movieData = await fetchMovieById(movieId);
      results.push(movieData);
    }
    renderLibraryCards(results);
  } catch (error) {
    console.log('Błąd podczas pobierania danych filmów:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const watchedMoviesArray = JSON.parse(localStorage.getItem('watched'));

  try {
    if (watchedMoviesArray) {
      const results = [];
      for (const movieId of watchedMoviesArray) {
        const movieData = await fetchMovieById(movieId);
        results.push(movieData);
      }
      renderLibraryCards(results);
    } else {
      console.log('brak zapisanych filmów na tablicy Watched Movies');
    }
  } catch (error) {
    console.log('Błąd podczas pobierania danych filmów:', error);
  }
});

function renderLibraryCards(movies) {
  const markup = movies
    .map(({ poster_path, title, name, id, release_date, first_air_date, vote_average }) => {
      const movieTitle = title ? title : name;
      const vote = vote_average.toFixed(1);
      const releaseDate = (release_date || first_air_date || '').slice(0, 4);
      const moviePoster =
        poster_path != null ? `https://image.tmdb.org/t/p/w500${poster_path}` : noMoviePoster;
      return `

          <li class="movie-card" data-id="${id}" data-type="movie">
            <div class="movie-card__box">
              <img class="movie-card__img" src="${moviePoster}" data-img="${moviePoster}" loading="lazy" alt="${movieTitle}" />
            </div>
            <h2 class="movie-card__heading">${movieTitle}</h2>

            <span class="movie-card__caption">  ${releaseDate} <span class="library-vote"> ${vote} </span></span>
            </li>
          `;
    })
    .join('');

  libraryGallery.innerHTML = markup;
  addModalListenerFunction();
}
