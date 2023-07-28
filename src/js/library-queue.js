import { fetchMovies } from './fetch-data';


const gallery = document.querySelector(".library-gallery")
const libraryQueueBtn = document.querySelector('.library-queue-btn');
libraryQueueBtn.addEventListener('click', e => {
  localStorage.setItem('queueActive', true);
  localStorage.setItem('watchedActive', false);
  localStorage.setItem('searching', false);
  renderQueueFilms();
  addActiveColorLibraryQBtn();
  removeActiveColorLibraryWBtn();
});

export function renderQueueFilms() {
  let localStorageData = JSON.parse(localStorage.getItem('filmsQueue'));
  if (localStorageData === null || localStorageData.length === 0) {
    gallery.innerHTML =
      '<p>The list is empty. Please, add queue films</p>';
  } else {
    gallery.innerHTML = ''
    localStorageData.forEach(e => {
      fetchMovies(e)
        .then(data => {
          const dataObj = { ...data, year: new Date(data.release_date).getFullYear() };
          gallery.insertAdjacentHTML('beforeend', gallery([dataObj]));
        })
        .catch(showModalError);
    });

  }
}