const infoContainer = document.querySelector(".info-container");

function createWeatherInfo(weatherDetail, forecastDetail) {
	createLocation(weatherDetail);
   createTempConditions(weatherDetail, forecastDetail)
}

// We want to show the city and country's name
function createLocation(weatherDetail) {
   const locationContainer = createElement("div", "location-container")
   const locationPlace = createElement("h1", "location-title");
   locationPlace.textContent = `${weatherDetail.location.name}`
   locationContainer.appendChild(locationPlace);

   const locationCountry = createElement("h2", "location-country");
   locationCountry.textContent = `${weatherDetail.location.country}`
   locationContainer.appendChild(locationCountry);

   infoContainer.appendChild(locationContainer);
}

// The more important details are included here: current temp, main condition, and
function createTempConditions(weatherDetail, forecastDetail) {
   const tempInfoContainer = createElement('div', 'temp-info-container')
   const leftTempContainer = createElement('div', 'left-temp-container')
   const rightTempContainer = createElement('div', 'right-temp-container')

   // Temp info's Left side container
   const tempF =  createElement('p', 'temp-fahrenheit')
   tempF.textContent = `${weatherDetail.current.temp_f}°F`
   const tempC =  createElement('p', 'temp-celsius')
   tempC.textContent = `${weatherDetail.current.temp_c}°C`
   leftTempContainer.appendChild(tempF)
   leftTempContainer.appendChild(tempC)

   // Temp info's right side container
   const condition = createElement('p', 'condition-info')
   condition.textContent = `${weatherDetail.current.condition.text}`
   const feelsLikeTempC = createElement('p', 'feels-like-info')
   feelsLikeTempC.textContent = `Feels like ${weatherDetail.current.feelslike_c}°C`
   const feelsLikeTempF = createElement('p', 'feels-like-info')
   feelsLikeTempF.textContent = `Feels like ${weatherDetail.current.feelslike_f}°F`
   const precipitation =  createElement('p', 'precipitation')
   precipitation.textContent = `Chance of rain: ${forecastDetail.forecast.forecastday[0].day.daily_chance_of_rain}%`
   rightTempContainer.appendChild(condition)
   rightTempContainer.appendChild(feelsLikeTempF)
   rightTempContainer.appendChild(feelsLikeTempC)
   rightTempContainer.appendChild(precipitation)

   tempInfoContainer.appendChild(leftTempContainer)
   tempInfoContainer.appendChild(rightTempContainer)
   infoContainer.appendChild(tempInfoContainer);
}

function removeWeatherInfo() {
   while(infoContainer.hasChildNodes()) {
      infoContainer.removeChild(infoContainer.firstElementChild)
   }
}

function createElement(type, className) {
	const elementType = document.createElement(type);
	elementType.classList.add(className);
   return elementType;
}

export { createWeatherInfo, removeWeatherInfo };
