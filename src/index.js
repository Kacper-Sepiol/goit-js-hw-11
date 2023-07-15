'use strict';

import Notiflix from 'notiflix';
import axios from 'axios';

const form = document.querySelector('#search-form');
const formInput = document.querySelector('#form-input');
const gallery = document.querySelector('.gallery');

const apiKey = '38274981-bf681d1339bb2c6c927a948b3';
let searchPhoto = '';

const fetchImg = async () => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${apiKey}&q=${searchPhoto}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  const data = await response.json();

  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  if (data.hits.length >= 1) {
    Notiflix.Notify.success('loaded!');
  }

  const images = data.hits.map(image => ({
    webformatURL: image.webformatURL,
    largeImageURL: image.largeImageURL,
    tags: image.tags,
    likes: image.likes,
    views: image.views,
    comments: image.comments,
    downloads: image.downloads,
  }));

  const markup = images
    .map(images => {
      return `<div class="photo-card">
    <img src="${images.webformatURL}" alt="${images.tags}" loading="lazy" class="img"/>
    <div class="info">
      <p class="info-item">
        <b>${images.likes}: Likes</b>
      </p>
      <p class="info-item">
        <b>${images.views}: Views</b>
      </p>
      <p class="info-item">
        <b>${images.comments}: Comments</b>
      </p>
      <p class="info-item">
        <b>${images.downloads}: Downloads</b>
      </p>
    </div>
  </div>`;
    })
    .join('');

  gallery.innerHTML = markup;

  return images;
};

form.addEventListener('submit', event => {
  event.preventDefault();

  searchPhoto = formInput.value;
  fetchImg(searchPhoto);
  searchPhoto = '';
  return;
});