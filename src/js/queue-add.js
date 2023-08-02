import { monitorButtons } from './buttons';

const modalMovieEl = document.querySelector('.modal-movie');
const addQueueBtn = modalMovieEl.querySelector('.modal-movie__btn-queue');

let queueStorageData = JSON.parse(localStorage.getItem('queueFilms'));
if (queueStorageData === null) {
  localStorage.setItem('queueFilms', JSON.stringify([]));
}
addQueueBtn.addEventListener('click', addToQueue);

export function addToQueue(e) {
  let id = addQueueBtn.getAttribute('id');
  const localStorageData = JSON.parse(localStorage.getItem('queueFilms'));
  if (!localStorageData.includes(id)) {
    localStorageData.push(id);
    console.log(localStorageData);
    localStorage.setItem('queueFilms', JSON.stringify(localStorageData));
    if (localStorage.getItem('queueActive') === 'true') {
    }
  } else {
    let indexlocalStorageData = localStorageData.indexOf(id);
    if (indexlocalStorageData !== -1) {
      localStorageData.splice(indexlocalStorageData, 1);
    }
    localStorage.setItem('queueFilms', JSON.stringify(localStorageData));
    if (localStorage.getItem('queueActive') === 'true') {
    }
  }
  monitorButtons('queueFilms', id);
}
