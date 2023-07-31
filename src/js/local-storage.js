import { fetchMovieById, addModalListenerFunction, getGenresNames } from './fetch-data';
import noMoviePoster from '../images/no-poster-available.jpg';
import genresData from './genres.json';

const libraryGallery = document.querySelector('.library-gallery');

async function renderLibraryCards(movies) {
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

  libraryGallery.innerHTML = markup;
}

///////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', async () => {
  const watchedMoviesArray = JSON.parse(localStorage.getItem('watched'));

  try {
    if (watchedMoviesArray) {
      const promises = watchedMoviesArray.map(movieId => {
        return fetchMovieById(movieId);
      });

      const results = await Promise.all(promises);
      renderLibraryCards(results);

      // Po załadowaniu elementów wywołujemy funkcję addModalListenerFunction
      addModalListenerFunction();
    } else {
      console.log('brak zapisanych filmów na tablicy Watched Movies');
    }
  } catch (error) {
    console.log('Błąd podczas pobierania danych filmów:', error);
  }
});

// Funkcja dodająca film do localStorage
function addToLocalStorage(movieId, listType) {
  const moviesList = JSON.parse(localStorage.getItem(listType)) || [];
  if (!moviesList.includes(movieId)) {
    moviesList.push(movieId);
    localStorage.setItem(listType, JSON.stringify(moviesList));
  }
}

// Funkcja usuwająca film z localStorage
function removeFromLocalStorage(movieId, listType) {
  const moviesList = JSON.parse(localStorage.getItem(listType)) || [];
  const updatedList = moviesList.filter(id => id !== movieId);
  localStorage.setItem(listType, JSON.stringify(updatedList));
}

function checkMovieInLocalStorage(movieId, listType) {
  const moviesList = JSON.parse(localStorage.getItem(listType)) || [];
  return moviesList.includes(movieId);
}

export {
  addToLocalStorage,
  removeFromLocalStorage,
  checkMovieInLocalStorage,
  isMovieInWatched,
  isMovieInQueue,
};
