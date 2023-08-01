import { fetchMovieById } from './fetch-data';
import noMoviePoster from '../images/no-poster-available.jpg';

const libraryGallery = document.querySelector('.library-gallery');

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
    .map(({ poster_path, title, name, id }) => {
      const movieTitle = title ? title : name;
      const moviePoster =
        poster_path != null ? `https://image.tmdb.org/t/p/w500${poster_path}` : noMoviePoster;
      return `
          <li class="movie-card" data-id="${id}" data-type="movie">
            <div class="movie-card__box">
              <img class="movie-card__img" src="${moviePoster}" data-img="${moviePoster}" loading="lazy" alt="${movieTitle}" />
            </div>
            <h2 class="movie-card__heading">${movieTitle}</h2>
          </li>
          `;
    })
    .join('');

  libraryGallery.innerHTML = markup;
}
