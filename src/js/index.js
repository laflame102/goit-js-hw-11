import Notiflix from 'notiflix';
import { fetchRequest } from "./fetchRequest";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../common.css'

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const load = document.querySelector('.load-more')

const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


form.addEventListener('submit', onSearch);
load.addEventListener('click', onLoad);

let page = 1;

load.classList.add('is-hidden');

function onSearch(evt) {
  evt.preventDefault();
  
  const value = evt.target.elements.searchQuery.value.trim();

  gallery.innerHTML = '';

  if (!value) {
return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }
// return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  fetchRequest(value).then(data => {
    load.classList.remove('is-hidden')

    createMarkup(data);
      simpleLightbox.refresh();
  })
    .catch(error => console.log(error))
}

function createMarkup({ data: { hits } }) {
  const markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`
  }).join('');
 
  gallery.insertAdjacentHTML('beforeend', markup);
}

function onLoad() {
  page += 1;
  
  fetchRequest(form.elements.searchQuery.value.trim(), page).then(data => {
    createMarkup(data);
      simpleLightbox.refresh();
  })
}




// if (document.querySelectorAll('.photo-card').length >= total) {
//     return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//   }