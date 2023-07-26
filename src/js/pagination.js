import { fetchMovies, renderMoviesCards, fetchGenres, loadMovies } from './fetch-data.js';

console.log('paginacja');

let page = 1;
let totalPages = 500;
let currentPage = 1;

let prevElement = null;
let nextElement = null;

//PAGINACJA
const ulTag = document.querySelector('.pagination-ul');
const prevButton = document.querySelector('.arrow__left');
const firstPage = document.querySelector('.first');
const currentPageElement = document.querySelector('.active');
const nextPage = document.querySelector('.plus-1');
const lastPage = document.querySelector('.last');
const nextButton = document.querySelector('.arrow__right');

function updatePagination() {
  currentPageElement.textContent = currentPage;
  nextPage.textContent = currentPage + 1;
  console.log('update paginacji');
}

// firstPage = page;
document.addEventListener('DOMContentLoaded', () => {
  console.log('ladowanie api');
  loadMovies(currentPage);
  console.log('zaladowano api');
  updatePagination();
  console.log('paginacja');
});

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadMovies(currentPage);
    console.log('click prev btn');
    updatePagination();
  }
});

nextPage.addEventListener('click', () => {
  if (currentPage >= 1) {
    currentPage++;
    loadMovies(currentPage);
    console.log('click next page');
    updatePagination();
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadMovies(currentPage);
    updatePagination();
    console.log('click next btn');
  }
});

export { updatePagination };

//////////////////////////

//function fetchTotalPages() {
//totalPages = totalPagesResponse;
//addEventListeners();
//element(totalPages, currentPage);

// if (currentPage === 1) {
//   prev.disabled = true;
//   dotsPrev.classList.add('is-hidden-btn');
//   btnMinus2.classList.add('is-hidden-btn');
//   btnMinus1.classList.add('is-hidden-btn');
//   btnCurrentPage.textContent = page;
//   btnPlus1.textContent = currentPage + 1;
//   btnPlus2.textContent = currentPage + 2;
// }

// function handlePageChange(pageNumber) {
//   currentPage = pageNumber;
//   const url = BASE_URL + MAIN_PAGE_PATH + '?api_key=' + API_KEY + '&page=' + pageNumber;
//   getMovies(url);
// }

// function getMovies(url) {
//   lastURL = url;
//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data.results);
//       if (data.results.length !== 0) {
//         loadMovies(data.results);
//         currentPage = data.page;
//         prevElement = currentPage + 1;
//         nextElement = currentPage - 1;
//         totalPages = data.total_pages;
//         let liTag = '';
//         let activeLi;

//         generatePagination();

//         //GENEROWANIE <LI>

//         function generatePagination() {
//           //DODAWANIE PRZYCISKU POPRZEDNIA STRONA JEŚLI STRONA JEST WIĘKSZA NIŻ 1
//           if (page > 1) {
//             liTag += `<li class="btn arrow__left" onclick="generatePagination(totalPages, ${
//               page - 1
//             })">
//       <svg class="arrow__left--icon">
//         <use href="../images/icons/icons.svg#"></use>
//       </svg>
//     </li> `;
//           }
//           //DODAWANIE 1 STRONY JEŚLI STRONA JEST WIĘKSZA NIŻ 2
//           if (page > 2) {
//             liTag += `<li class="numb" onclick="generatePagination(totalPages, 1)"><span>1</span></li>`;
//             //DODAWANIE KROPEK JEŚLI STRONA JEST WIĘKSZA NIŻ 3
//             if (page > 3) {
//               liTag += `<li class="dots"><span>...</span></li>`;
//             }
//           }
//           //UNIKANIE WYŚWIETLANIA ZBYT WIELU STRON PRZED BIEŻĄCĄ STRONĄ
//           if (page == totalPages) {
//             nextElement = nextElement - 2;
//           } else if (page == totalPages - 1) {
//             nextElement = nextElement - 1;
//           }
//           //UNIKANIE WYŚWIETLANIA ZBYT WIELU NUMERÓW STRON PO BIEŻĄCEJ
//           if (page == 1) {
//             prevElement = prevElement + 2;
//           } else if (page == 2) {
//             prevElement = prevElement + 1;
//           }

//           //PĘTLA Z GENEROWANIEM NUMERÓW STRON
//           for (let pageLength = nextElement; pageLength <= prevElement; pageLength++) {
//             if (pageLength > totalPages) {
//               continue;
//             }
//             if (pageLength == 0) {
//               pageLength = pageLength + 1;
//             }
//             if (page == pageLength) {
//               activeLi = 'active';
//             } else {
//               activeLi = '';
//             }

//             liTag += `<li class="numb ${activeLi}" onclick="generatePagination(totalPages, ${pageLength})">
//       <span>${pageLength}</span>
//     </li>`;
//           }
//           //DODAWANIE KROPEK Z PRAWEJ STRONY
//           if (page < totalPages - 1) {
//             if (page < totalPages - 2) {
//               liTag += `<li class="dots"><span>...</span></li>`;
//             }
//             liTag += `<li class="numb" onclick="generatePagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
//           }

//           //JEŻELI STRONA JEST MNIEJSZA NIŻ WSZYSTKIE STRONY, WTEDY DODAJE PRZYCISK NEXT
//           if (page < totalPages) {
//             liTag += `<li class="btn arrow__right" onclick="generatePagination(totalPages, ${
//               page + 1
//             })">
//     <svg class="arrow__right--icon">
//       <use href="../images/icons/icons.svg#"></use>
//     </svg>
//     </li>`;
//           }
//         }
//       }
//     });
// }

// //EVENT LISTENERS
// //ADD
// prev.addEventListener('click', () => {
//   if (prevElement !== null) {
//     pageCall(nextPage);
//   }
// });

// next.addEventListener('click', () => {
//   if (nextElement !== null) {
//     pageCall(nextPage);
//   }
// });

// function addEventListeners() {
//   const pageElements = document.querySelectorAll('li.numb');
//   pageElements.forEach(pageElement => {
//     pageElement.addEventListener('click', changePage);
//   });
// }

// //remove

// function removeEventListeners() {
//   const pageElements = document.querySelectorAll('li.numb');
//   pageElements.forEach(pageElement => {
//     pageElement.removeEventListener('click', changePage);
//   });

//   if (prevElement !== null) {
//     prev.removeEventListener('click', pageCall);
//   }

//   if (nextElement !== null) {
//     next.removeEventListener('click', pageCall);
//   }

//   //KEY EVENT
//   document.addEventListener('keydown', keydownHandler);

//   document.removeEventListener('keydown', keydownHandler);
// }

// ulTag.addEventListener('DOMContentLoaded', function () {
//   pageClickHandler.call(ulTag.querySelector('li.numb'));
// });

// function keydownHandler(event) {
//   if (event.key === 'ArrowLeft') {
//     changePage(currentPage - 1);
//   } else if (event.key === 'ArrowRight') {
//     changePage(currentPage + 1);
//   }
// }

// function changePage(pageNumber) {
//   if (pageNumber < 1) {
//     currentPage = 1;
//   } else if (pageNumber > totalPages) {
//     currentPage = totalPages;
//   } else {
//     currentPage = pageNumber;
//   }
//   generatePagination(totalPages, currentPage);
// }

// function pageCall(page) {
//   let urlSplit = lastURL.split('?');
//   let queryParams = urlSplit[1].split('&');
//   let key = queryParams[queryParams.length - 1].split('=');
//   if (key[0] != 'page') {
//     let url = lastURL + '&pages=' + page;
//     getMovies(url);
//   } else {
//     key[1] = page.toString();
//     let a = key.join('');
//     queryParams[queryParams.length - 1] = a;
//     let b = queryParams.join('&');
//     let url = urlSplit[0] + '?' + b;
//     getMovies(url);
//   }
// }

// export { generatePagination };
