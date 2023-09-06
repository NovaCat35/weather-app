import formatDate from "./dateController.js";

const infoContainer = document.querySelector(".info-container");
let tempVersion = "fahrenheit";
let tempSymbol = "F";
let currWeatherDetail = null;
let currForecastDetail = null;

// WE IMMEDIATELY fill all the info fetched from weatherDetail into the actual DOM here
function createWeatherInfo(weatherDetail, forecastDetail) {
	// We need to keep track of the current fetched details so we can reuse info if toggle temp switch clicked
	currWeatherDetail = weatherDetail;
	currForecastDetail = forecastDetail;
	createLocation(weatherDetail);
	createTempConditions(weatherDetail, forecastDetail);
}

function createLocation() {
   // We want to show the city and country's name
	const locationContainer = createElement("div", "location-container");
	const locationPlace = createElement("h1", "location-title");
	locationPlace.textContent = `${currWeatherDetail.location.name}, ${currWeatherDetail.location.country}`;
	locationContainer.appendChild(locationPlace);

   // We display the main weather condition
	locationContainer.appendChild(createDailyCondition());

   // Here, we also display the current date at time of loading webpage
	const locationTime = createElement("p", "location-country");
	const formatedDate = formatDate(currWeatherDetail.location.localtime);
	locationTime.textContent = `${formatedDate}`;
	locationContainer.appendChild(locationTime);

	infoContainer.appendChild(locationContainer);
}

// Main weather condition description
function createDailyCondition() {
	const condition = createElement("h2", "condition-info");
	condition.textContent = `${currWeatherDetail.current.condition.text}`;
	return condition;
}

// The more important details of the current temperature are included here
function createTempConditions() {
	const tempInfoContainer = createElement("div", "temp-info-container");
	const leftTempContainer = createElement("div", "left-temp-container");
	const rightTempContainer = createElement("div", "right-temp-container");

	// Temp info's Left side container
	const mainTemp = createMainTempType();
	leftTempContainer.appendChild(mainTemp);

	// Temp info's right side container
   const feelsLikeTemp = createFeelsLikeTempType()
   const avgTemp = createAvgTemp();
   const highTemp = createHighTemp();
   const lowTemp = createLowTemp();

	rightTempContainer.appendChild(feelsLikeTemp);
	rightTempContainer.appendChild(avgTemp);
	rightTempContainer.appendChild(highTemp);
	rightTempContainer.appendChild(lowTemp);

	tempInfoContainer.appendChild(leftTempContainer);
	tempInfoContainer.appendChild(rightTempContainer);
	infoContainer.appendChild(tempInfoContainer);
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createMainTempType() {
	const temp = createElement("p", `temp-${tempVersion}`);
   temp.classList.add('main-temp');
	temp.textContent = `${currWeatherDetail.current.temp_f}°${tempSymbol}`;
	return temp;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createFeelsLikeTempType() {
	const feelsLikeTemp = createElement("p", "feels-like-info");
   if(tempSymbol == "F") {
      feelsLikeTemp.textContent = `Feels like ${currWeatherDetail.current.feelslike_f}°F`;
   } else {
      feelsLikeTemp.textContent = `Feels like ${currWeatherDetail.current.feelslike_f}°C`;
   }
   return feelsLikeTemp;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createAvgTemp() {
	const avgTemp = createElement("p", "avg-temp");
   if(tempSymbol == "F") {
      console.log(tempSymbol)
	   avgTemp.textContent = `Average of ${currForecastDetail.forecast.forecastday[0].day.avgtemp_f}°F`;
   } else {
	   avgTemp.textContent = `Average of ${currForecastDetail.forecast.forecastday[0].day.avgtemp_c}°C`;
   }
   return avgTemp;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createHighTemp() {
	const highTemp = createElement("p", "high-temp");
   if(tempSymbol == "F") {
	   highTemp.textContent = `High of ${currForecastDetail.forecast.forecastday[0].day.maxtemp_f}°F`;
   } else {
	   highTemp.textContent = `High of ${currForecastDetail.forecast.forecastday[0].day.maxtemp_c}°C`;
   }
   return highTemp;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createLowTemp() {
	const highTemp = createElement("p", "high-temp");
   if(tempSymbol == "F") {
	   highTemp.textContent = `Low of ${currForecastDetail.forecast.forecastday[0].day.mintemp_f}°F`;
   } else {
	   highTemp.textContent = `Low of ${currForecastDetail.forecast.forecastday[0].day.mintemp_c}°C`;
   }
   return highTemp;
}

function removeWeatherInfo() {
	while (infoContainer.hasChildNodes()) {
		infoContainer.removeChild(infoContainer.firstElementChild);
	}
}

function createAdditionalInfo() {
	// const precipitation =  createElement('p', 'precipitation')
	// precipitation.textContent = `Chance of rain: ${forecastDetail.forecast.forecastday[0].day.daily_chance_of_rain}%`
}

function handleToggle(toggledTypeVersion) {
	if (toggledTypeVersion == "celsius") {
		tempVersion = toggledTypeVersion;
		tempSymbol = "C";
	} else {
		tempVersion = toggledTypeVersion;
		tempSymbol = "F";
	}
   removeWeatherInfo();
   createWeatherInfo(currWeatherDetail, currForecastDetail);
}

function createElement(type, className) {
	const elementType = document.createElement(type);
	elementType.classList.add(className);
	return elementType;
}

export { createWeatherInfo, removeWeatherInfo, handleToggle };
