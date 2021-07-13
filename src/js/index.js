import countryInfo from '../templates/card-country.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

// const r = fetch('https://restcountries.eu/rest/v2/name/{name}');
fetch('https://restcountries.eu/rest/v2/name/Switzerland')
  // fetch('https://restcountries.eu/rest/v2/name/Colombia')
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
    const markup = countryInfo(...country);
    // console.log(markup);
    refs.countryInfo.innerHTML = markup;
  })
  .catch(error => {
    console.log(error);
  });

// console.log(r);
