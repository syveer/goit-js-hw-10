const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

// ui.js
export function showError() {
  const error = document.querySelector('.error');
  error.style.display = 'block';
}

export function showLoader() {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  catInfo.style.display = 'none';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function showBreedSelect() {
  breedSelect.style.display = 'block';
}

export function hideBreedSelect() {
  breedSelect.style.display = 'none';
}

export function showCatInfo() {
  catInfo.style.display = 'block';
}

export function hideCatInfo() {
  catInfo.style.display = 'none';
}
