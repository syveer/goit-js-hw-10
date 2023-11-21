import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from '../partials/api.js';
import {
  showLoader,
  hideLoader,
  showError,
  showCatInfo,
} from '../partials/ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = new SlimSelect({
    select: '.breed-select',
    placeholder: 'Select a breed',
    searchPlaceholder: 'Search',
    allowDeselect: true,
  });

  try {
    showLoader();
    const response = await fetchBreeds();
    const breeds = response.data;
    const breedOptions = breeds.map(breed => ({
      text: breed.name,
      value: breed.id,
    }));

    // Set data for SlimSelect
    breedSelect.setData(breedOptions);
    hideLoader();
  } catch (error) {
    showError();
    Notiflix.Notify.Failure('An error occurred while fetching cat data.');
  }

  breedSelect.slim.on('change', async () => {
    try {
      showLoader();
      const selectedBreed = breedSelect.slim.selected();
      const breedId = selectedBreed ? selectedBreed.value : '';
      const response = await fetchCatByBreed(breedId);
      const catData = response.data[0];
      showCatInfo(catData);
      hideLoader();
    } catch (error) {
      showError();
      Notiflix.Notify.Failure('An error occurred while fetching cat data.');
    }
  });
});
