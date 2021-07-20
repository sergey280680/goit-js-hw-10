import countryInfo from '../templates/card-country.hbs';
import countryList from '../templates/country-list.hbs';
import * as _ from 'lodash';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let globalSattingsNotify = {
  position: 'center-top',
  showOnlyTheLastOne: true,
  clickToClose: true,
};

// console.log(globalSattingsNotify.position: "left-top");

const refs = {
  searchForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchForm.addEventListener('input', _.debounce(onSearch, DEBOUNCE_DELAY));
// Switzerland Ukraine

function onSearch(e) {
  e.preventDefault(); //предотврощает перезагрузку страницы при заполнении формы
  const searchQuery = refs.searchForm.value;

  if (searchQuery === '') {
    resetCountry();
    return;
  }

  fetchCountries(searchQuery).then(renderCountry).catch(notifyFailure);
}

function fetchCountries(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
    return response.json();
  });
}

function resetCountry() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderCountry(country) {
  if (country.length > 10) {
    resetCountry();
    notifyInfo();
    return;
  }

  if (country.length >= 2 && country.length <= 10) {
    const markup = [...country];
    refs.countryList.innerHTML = countryList({ pageContent: markup });
    refs.countryInfo.innerHTML = '';
    return;
  }

  if (country.length === 1) {
    const markup = countryInfo(...country);
    refs.countryInfo.innerHTML = markup;
    refs.countryList.innerHTML = '';
    return;
  }

  if (!response.ok) {
    console.log('response');
    fetchCountries().catch();
  }
}

const notifyInfo = () => {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.',
    globalSattingsNotify,
  );
};

const notifyFailure = () => {
  resetCountry();
  Notiflix.Notify.failure('Oops, there is no country with that name', globalSattingsNotify);
};
