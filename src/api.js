import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'api_key=live_fDbQwhpqEKTaFYrOZlKbVKDEtNKb4kx1rwhqwfqQPFVzAjvzVNuopVfnytC62w8O';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}
