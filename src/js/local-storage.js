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
  
  export { addToLocalStorage, removeFromLocalStorage, checkMovieInLocalStorage };
  

