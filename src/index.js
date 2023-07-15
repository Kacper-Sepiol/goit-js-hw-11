'use strict';

const form = document.querySelector('#search-form');
const formInput = document.querySelector('#form-input');

const apiKey = '38274981-bf681d1339bb2c6c927a948b3';
let searchPhoto = '';

const fetchImg = async value => {
  const response = await fetch(
    `https://pixabay.com/api/?key=${apiKey}&q=${searchPhoto}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  const data = await response.json();
  console.log(data);
  return response;
};

form.addEventListener('submit', event => {
  event.preventDefault();

  searchPhoto = formInput.value;
  fetchImg(searchPhoto);
  searchPhoto = '';
  return;
});
