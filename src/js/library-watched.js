import { fetchMovies } from './fetch-data';



libraryBtnEl.addEventListener('click', e => renderWatchedFilms());
const libraryWatchedBtn = document.querySelector('.library-watched-btn');
libraryWatchedBtn.addEventListener('click', e => {
  localStorage.setItem('watchedActive', true)
  localStorage.setItem('queueActive', false)
  localStorage.setItem('searching', false);
  renderWatchedFilms();
});

export function renderWatchedFilms() {
  
  let localStorageData = JSON.parse(localStorage.getItem('filmsWatched'));
  if (localStorageData === null || localStorageData.length === 0) {
    gallery.innerHTML =
      '<p>The list is empty. Please, add watched films</p>';
  } else {
    gallery.innerHTML = ''
    localStorageData.forEach(e => {
        fetchMovies(e)
        .then(data => {
          const dataObj = { ...data, year: new Date(data.release_date).getFullYear() };
          gallery.insertAdjacentHTML('beforeend', filmCard([dataObj]));
        })
        .catch(showModalError);
    });

  }
}