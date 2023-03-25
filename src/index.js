import './css/styles.css';
import { fetchCountries } from './js/fetchCountries'; 
import debounce from 'lodash.debounce'; 
import Notiflix from 'notiflix'; 

const DEBOUNCE_DELAY = 300; 
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener(
  'input',
  debounce(e => {

    // очистка пробілів 
    const trimmedValue = input.value.trim();
    cleanHtml(); // очистка списку 

    // чи значення НЕ пусте
    if (trimmedValue !== '') {

     
      fetchCountries(trimmedValue).then(foundData => {

        // якщо знайдено більше 10 країн 
        if (foundData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );

          // якщо знайдено 0 
        } else if (foundData.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');

         
        } else if (foundData.length >= 2 && foundData.length <= 10) {

          renderCountryList(foundData); 

          
        } else if (foundData.length === 1) {
          renderOneCountry(foundData); // вивід 1 країни 
        }
      });
    }
  }, DEBOUNCE_DELAY)
);


function renderCountryList(countries) {


  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official
        }" width="30" hight="20">
         <p>${country.name.official}</p>
                </li>`;
    })
    .join(''); 

  // вставлення li в ul 
  countryList.innerHTML = markup;
}


function renderOneCountry(countries) {

 
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official
        }" width="30" hight="20">
         <p>${country.name.official}</p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join(''); 


  countryList.innerHTML = markup;
}


function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
