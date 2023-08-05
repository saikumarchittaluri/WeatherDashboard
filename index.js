const apiKey = '2a619a0dd48e915b7969a0157d096f67';
const weatherCardsContainer = document.getElementById('weatherCards');
const cityInput = document.getElementById('cityInput');
const addBtn = document.getElementById('addBtn');

let cities = [];

function createWeatherCard(cityData) {
  const weatherCard = document.createElement('div');
  weatherCard.className = 'weather-card';

  const weatherIcon = document.createElement('img');
  weatherIcon.className = 'weather-icon';
  weatherIcon.src = `https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`;
  weatherIcon.alt = cityData.weather[0].main;

  const weatherInfo = document.createElement('div');
  weatherInfo.className = 'weather-info';
  const cityName = document.createElement('p');
  cityName.className='city';
  cityName.textContent = cityData.name;
  const temperature = document.createElement('p');
  temperature.className='temp';
  temperature.textContent = `${cityData.main.temp}°`;

  const backgroundImage = document.createElement('img');
  backgroundImage.className = 'background-image';
  backgroundImage.src = `Rectangle 1.png`;  
  
  weatherCard.appendChild(backgroundImage);

  weatherCardsContainer.appendChild(weatherCard);
  
  weatherInfo.appendChild(cityName);
  weatherInfo.appendChild(temperature);

  weatherCard.appendChild(weatherIcon);
  weatherCard.appendChild(weatherInfo);

  weatherCardsContainer.appendChild(weatherCard);
}


function fetchWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      createWeatherCard(data);
      cities.push(data);
      cities.sort((a, b) => a.main.temp - b.main.temp);
    })
    .catch((error) => console.log('Error fetching weather data:', error));
}

addBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === '') {
    alert('Please enter a valid city name.');
    return;
  }

  const existingCity = cities.find((c) => c.name.toLowerCase() === city.toLowerCase());
  if (existingCity) {
    alert('City already added.');
    return;
  }

  fetchWeatherData(city);
  cityInput.value = '';
});

cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addBtn.click();
  }
});
