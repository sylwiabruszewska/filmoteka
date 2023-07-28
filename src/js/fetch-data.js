import Notiflix from 'notiflix';
import noMoviePoster from '../images/no-poster-available.jpg';

const galleryOfMovies = document.querySelector('.movie-gallery');
const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const MAIN_PAGE_PATH = '/trending/all/day';
const GENRE_LIST_PATH = `/genre/movie/list`;

async function fetchMovies(page) {
  const response = await fetch(`${BASE_URL}${MAIN_PAGE_PATH}?api_key=${API_KEY}&page=${page}`);
  const fetchMovies = await response.json();
  return fetchMovies.results;
}

async function renderMoviesCards(movies) {
  const genres = await fetchGenres();
  const markup = movies

    .map(
      ({ poster_path, title, name, genre_ids, id, media_type, release_date, first_air_date }) => {
        const movieGenres = genre_ids
          .map(genreId => {
            const genre = genres.find(genre => genre.id === genreId);
            return genre ? genre.name : null;
          })
          .filter(genreName => genreName)
          .join(', ');

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

    // Opóźnij renderowanie o 1sek - później skasować setTimeout
    setTimeout(async () => {
      const movies = await fetchMovies(page);
      renderMoviesCards(movies);
      //   Notiflix.Block.remove('.movie-gallery');
      // }, 2000);
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
  addClickListenerToCards(movieCards);
}

async function addClickListenerToCards(cards) {
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

  cards.forEach(card => {
    card.addEventListener('click', async () => {
      Notiflix.Block.arrows('.modal-movie', {
        svgSize: '80px',
        svgColor: '#ff6b08',
        backgroundColor: '#ffffff',
      });

      const movieId = card.dataset.id;
      const mediaType = card.dataset.type;
      const movieData = await fetchMovieById(movieId, mediaType);

      // renderowanie danych
      modalTitle.textContent = movieData.title || movieData.name;
      modalPoster.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
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
    });
  });
}

export {
  fetchMovies,
  renderMoviesCards,
  fetchGenres,
  loadMovies,
  fetchMovieById,
  addModalListenerFunction,
  addClickListenerToCards,
};
