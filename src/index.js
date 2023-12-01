import SlimSelect from 'slim-select';
import './api.js';
import { fetchBreeds, fetchCatByBreed } from './api.js';
import { showLoader, hideLoader, showError, showCatInfo } from './ui.js';
import Notiflix from 'notiflix';

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
    Notiflix.Notify.failure('An error occurred while fetching cat data.');
  }

  const selectElement = document.querySelector('.breed-select');
  selectElement.addEventListener('change', async () => {
    try {
      showLoader();
      const selectedBreed = breedSelect.selected();
      const breedId = selectedBreed ? selectedBreed.value : '';
      const response = await fetchCatByBreed(breedId);
      const catData = response.data[0];
      showCatInfo(catData);
      Notiflix.Notify.success('Cat data loaded successfully.');
    } catch (error) {
      showError();
      Notiflix.Report.failure('An error occurred while fetching cat data.');
    } finally {
      hideLoader();
    }
  });
});
