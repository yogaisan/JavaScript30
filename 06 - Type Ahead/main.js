const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint).then(response => response.json())
  .then(data => cities.push(...data))

const findMatches = (wordToMatch, cities) => {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const displayMatches = (event) => {
  // console.log(event.currentTarget.value);
  const matchArray = findMatches(event.currentTarget.value, cities);
  // console.log(matchArray)
  const html = matchArray.map(place => {
    const regex = new RegExp(event.currentTarget.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${event.currentTarget.value}</span>`) // highlights city name typed
    const stateName = place.state.replace(regex, `<span class="hl">${event.currentTarget.value}</span>`) // highlights state name typed
    return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
};

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
