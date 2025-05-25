import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  // showLoader,
  // hideLoader,
  // showLoadMoreButton,
  // hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.getElementById('load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  // hideLoadMoreButton();
  // showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;
    // hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);
      // if (totalHits > currentPage * 15) {
      //   showLoadMoreButton();
      // }
    }
  } catch (error) {
    // hideLoader();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  }

  form.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  // hideLoadMoreButton();
  // showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    // hideLoader();

    createGallery(data.hits);
    if (currentPage * 15 >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      // showLoadMoreButton();
    }

    // Плавне прокручування
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    // hideLoader();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  }
});
