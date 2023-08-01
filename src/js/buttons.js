export function monitorButtons(keyStorage, id) {
  const modalMovieEl = document.querySelector('.modal-movie');
  const addWatched = modalMovieEl.querySelector('.modal-movie__btn-watched');
  const addQueue = modalMovieEl.querySelector('.modal-movie__btn-queue');

  let localStorageDataWatched = JSON.parse(localStorage.getItem('watchedFilms'));
  let localStorageDataQueue = JSON.parse(localStorage.getItem('queueFilms'));

  const filmStatusWatched = localStorageDataWatched.includes(id);
  const filmStatusQueue = localStorageDataQueue.includes(id);

  switch (keyStorage) {
    case 'watchedFilms':
      addWatched.textContent = filmStatusWatched ? 'Remove from watched' : 'Add to watched';
      addWatched.style.backgroundColor = filmStatusWatched ? '#FF6B08' : 'white';
      addWatched.style.color = filmStatusWatched ? 'white`' : '#000000';
      addWatched.style.borderColor = filmStatusWatched ? '#FF6B08' : 'black';
      break;
    case 'queueFilms':
      addQueue.textContent = filmStatusQueue ? 'Remove from queue' : 'Add to queue';
      addQueue.style.backgroundColor = filmStatusQueue ? '#FF6B08' : 'white';
      addQueue.style.color = filmStatusQueue ? 'white' : '#000000';
      addQueue.style.borderColor = filmStatusQueue ? '#FF6B08' : 'black';
      break;
  }
}
