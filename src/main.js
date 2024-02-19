import axios from 'axios';
import { fetchImages } from './js/pixabay-api';
import { createMarkup } from './js/render-function';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const params = {
  formSearch: document.querySelector('.form'),
  imageList: document.querySelector('.gallery'),
  preload: document.querySelector('.loader'),
  nextBtn: document.querySelector('#next-btn'),
};

const hiddenClass = 'is-hidden';
let page = 0;
let searchValue = '';

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

params.formSearch.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.input.value.trim();
  const form = event.currentTarget;

  searchValue = searchQuery;
  page = 1;

  params.nextBtn.classList.add(hiddenClass);
  params.imageList.innerHTML = '';

  if (!searchQuery) {
    iziToast.show({
      title: '❕',
      theme: 'light',
      message: `Please, fill in the search field`,
      messageSize: '20px',
      messageColor: '#808080',
      backgroundColor: '#e7fc44',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  params.preload.classList.remove(hiddenClass);

  try {
    const response = await fetchImages(searchValue,page);
    if (response.hits.length === 0) {
      iziToast.show({
        iconUrl: icon,
        theme: 'dark',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageSize: '16px',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        position: 'topRight',
        timeout: 5000,
      });
      form.reset();
      return;
    }

    params.imageList.innerHTML = createMarkup(response.hits);
    gallery.refresh();

    if (response.hits.length >= 15) {
      addNextPageBtn();
    }

    scrollBy();
    form.reset();
  } catch (err) {
    handleError(err);
  } finally {
    params.preload.classList.add(hiddenClass);
  }
}


function handleError(err) {
  console.error(err);
  params.imageList.innerHTML = '';
  iziToast.show({
    iconUrl: icon,
    theme: 'dark',
    message: err.stack,
    messageSize: '16px',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    position: 'topRight',
    timeout: 5000,
  });

  removeNextPageBtn();
}

async function nextPage() {
  params.preload.classList.remove(hiddenClass);
  removeNextPageBtn();
  page += 1;

  try {
    const res = await fetchImages(searchValue,page);

    if (page * 15 >= res.totalHits) {
      iziToast.show({
        title: '❕',
        theme: 'dark',
        message: "We're sorry, but you've reached the end of search results.",
        messageSize: '16px',
        messageColor: 'white',
        backgroundColor: '#4e75ff',
        position: 'topRight',
        timeout: 5000,
      });
      params.imageList.innerHTML += createMarkup(res.hits);
      gallery.refresh();
      removeNextPageBtn();

      scrollBy();

      return;
    }

    params.imageList.innerHTML += createMarkup(res.hits);
    gallery.refresh();

    scrollBy();

    addNextPageBtn();
  } catch (err) {
    handleError(err);
  } finally {
    params.preload.classList.add(hiddenClass);
  }
}

function scrollBy() {
  window.scrollBy({
    top: 640,
    behavior: 'smooth',
  });
}

function addNextPageBtn() {
  params.nextBtn.classList.remove(hiddenClass);
  params.nextBtn.addEventListener('click', nextPage);
}

function removeNextPageBtn() {
  params.nextBtn.classList.add(hiddenClass);
  params.nextBtn.removeEventListener('click', nextPage);
}