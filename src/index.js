// cat-api.js
import axios from 'axios';

const apiKey =
  'live_fDbQwhpqEKTaFYrOZlKbVKDEtNKb4kx1rwhqwfqQPFVzAjvzVNuopVfnytC62w8O';
axios.defaults.headers.common['x-api-key'] = apiKey;

const breedSelect = new SlimSelect({
  select: '.breed-select',
});

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImage = catInfo.querySelector('img');
const catName = catInfo.querySelector('.cat-name');
const catDescription = catInfo.querySelector('.cat-description');
const catTemperament = catInfo.querySelector('.cat-temperament');

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}

function showLoader() {
  loader.style.display = 'block';
  error.style.display = 'none';
  breedSelect.slim.reset();
  catInfo.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    showLoader();
    const response = await fetchBreeds();
    const breeds = response.data;
    const breedOptions = breeds.map(breed => ({
      text: breed.name,
      value: breed.id,
    }));
    breedSelect.setData(breedOptions);
    hideLoader();
  } catch (error) {
    showError();
  }
});

breedSelect.slim.on('change', async () => {
  try {
    showLoader();
    const selectedBreed = breedSelect.slim.selected();
    const breedId = selectedBreed ? selectedBreed.value : '';
    const response = await fetchCatByBreed(breedId);
    const catData = response.data[0];
    catImage.src = catData.url;
    catName.textContent = catData.breeds[0].name;
    catDescription.textContent = catData.breeds[0].description;
    catTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;
    catInfo.style.display = 'block';
    hideLoader();
  } catch (error) {
    showError();
  }
});
