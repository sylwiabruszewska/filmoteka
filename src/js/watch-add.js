import { monitorButtons } from './buttons';
const modalMovieEl = document.querySelector('.modal-movie');
const addWatchedBtn = modalMovieEl.querySelector('.modal-movie__btn-watched');

let watchedStorageData = JSON.parse(localStorage.getItem('watchedFilms'));
if (watchedStorageData === null) {
  localStorage.setItem('watchedFilms', JSON.stringify([]));
}
addWatchedBtn.addEventListener('click', addToWatched);

export function addToWatched(e) {
  let id = addWatchedBtn.getAttribute('id');
  const localStorageData = JSON.parse(localStorage.getItem('watchedFilms'));
  if (!localStorageData.includes(id)) {
    localStorageData.push(id);
    console.log(localStorageData);
    localStorage.setItem('watchedFilms', JSON.stringify(localStorageData));
    if (localStorage.getItem('watchedActive') === 'true') {
    }
  } else {
    let indexlocalStorageData = localStorageData.indexOf(id);
    if (indexlocalStorageData !== -1) {
      localStorageData.splice(indexlocalStorageData, 1);
    }
    localStorage.setItem('watchedFilms', JSON.stringify(localStorageData));
    if (localStorage.getItem('watchedActive') === 'true') {
    }
  }
  monitorButtons('watchedFilms', id);
}
