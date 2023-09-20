import { formatDate, getDateToDay } from "./dateController.js";
import convertKelvin from "./tempConversion.js";
import humidityImg from "../assets/humidity.svg";
import rainImg from "../assets/rain.svg";
import windImg from "../assets/wind.svg";
import cloudImg from "../assets/cloud.svg";
import sunriseImg from "../assets/sunrise.svg";
import sunsetImg from "../assets/sunset.svg";
import locationMarker from "../assets/locationIcon.svg";

const infoContainer = document.querySelector(".info-container");
const headerContainer = document.querySelector(".header");
let tempVersion = "fahrenheit";
let tempSymbol = "F";
let currWeatherDetail = null;
let currForecastDetail = null;
let currForecastWeatherList = null;

// WE IMMEDIATELY fill all the info fetched from weatherDetail into the actual DOM here
function createWeatherInfo(weatherDetail, forecastDetail, forecastWeatherList) {
	// We need to keep track of the current fetched details so we can reuse info if toggle temp switch clicked
	currWeatherDetail = weatherDetail;
	currForecastDetail = forecastDetail;
	currForecastWeatherList = forecastWeatherList;
	createLocation();
	createTempConditions();
	createAdditionalInfo();
	createWeeklyForecast();
}

function createLocation() {
	const locationContainer = createElement("div", "location-container");

	// We want to show the city and country's name
	const locationTitleContainer = createElement("div", "location-title-container");
	const locationIcon = createElement("img", "location-icon");
	const locationPlace = createElement("h1", "location-title");
	locationIcon.src = locationMarker;
	locationPlace.textContent = `${currWeatherDetail.location.name}, ${currWeatherDetail.location.country}`;
	locationTitleContainer.appendChild(locationIcon);
	locationTitleContainer.appendChild(locationPlace);
	locationContainer.appendChild(locationTitleContainer);

	// We display the main weather condition
	locationContainer.appendChild(createDailyCondition());

	// Here, we also display the current date at time of loading webpage
	const locationTime = createElement("p", "location-country");
	const formatedDate = formatDate(currWeatherDetail.location.localtime);
	locationTime.textContent = `${formatedDate}`;
	locationContainer.appendChild(locationTime);

	headerContainer.appendChild(locationContainer);
}

// Main weather condition description
function createDailyCondition() {
	const condition = createElement("h2", "condition-info");
	condition.textContent = `${currForecastDetail.forecast.forecastday[0].day.condition.text}`;
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

	// -- Temp info's right side container --
	// feelsLikeTemp info put in a span
	const feelsLikeTemp = createElement("p", "high-temp");
	feelsLikeTemp.textContent = "Feels like ";
	const feelsLikeTempSpan = document.createElement("span");
	feelsLikeTempSpan.textContent = createFeelsLikeTempType();
	feelsLikeTemp.appendChild(feelsLikeTempSpan);
	// avgTemp info put in a span
	const avgTemp = createElement("p", "avg-temp");
	avgTemp.textContent = "Average of ";
	const avgTempSpan = document.createElement("span");
	avgTempSpan.textContent = createAvgTemp();
	avgTemp.appendChild(avgTempSpan);
	// High temp info put in a span
	const highTemp = createElement("p", "high-temp");
	const highTempSpan = document.createElement("span");
	highTempSpan.textContent = createHighTemp(0);
	highTemp.textContent = "High ";
	highTemp.appendChild(highTempSpan);
	// Low temp info put in a span
	const lowTemp = createElement("p", "low-temp");
	const lowTempSpan = document.createElement("span");
	lowTempSpan.textContent = createLowTemp(0);
	lowTemp.textContent = "Low ";
	lowTemp.appendChild(lowTempSpan);

	rightTempContainer.appendChild(feelsLikeTemp);
	rightTempContainer.appendChild(avgTemp);
	rightTempContainer.appendChild(highTemp);
	rightTempContainer.appendChild(lowTemp);

	tempInfoContainer.appendChild(leftTempContainer);
	tempInfoContainer.appendChild(rightTempContainer);
	infoContainer.appendChild(tempInfoContainer);
}

// Additional important info included here
function createAdditionalInfo() {
	const additionalInfoContainer = createElement("div", "additional-info-container");

	const humidityText = `${currWeatherDetail.current.humidity}%`;
	const humidityWrapper = createWrapperContainer("humidity", humidityImg, humidityText);

	const precipitationText = `${currForecastDetail.forecast.forecastday[0].day.daily_chance_of_rain}%`;
	const precipitationWrapper = createWrapperContainer("precipitation", rainImg, precipitationText);

	const windText = createWindSpeed();
	const windWrapper = createWrapperContainer("wind", windImg, windText);

	const cloudinessText = `${currWeatherDetail.current.cloud}%`;
	const cloudinessWrapper = createWrapperContainer("cloudiness", cloudImg, cloudinessText);

	const sunriseText = `${currForecastDetail.forecast.forecastday[0].astro.sunrise}`;
	const sunriseWrapper = createWrapperContainer("sunrise", sunriseImg, sunriseText);

	const sunsetText = `${currForecastDetail.forecast.forecastday[0].astro.sunset}`;
	const sunsetWrapper = createWrapperContainer("sunrise", sunsetImg, sunsetText);

	additionalInfoContainer.appendChild(humidityWrapper);
	additionalInfoContainer.appendChild(precipitationWrapper);
	additionalInfoContainer.appendChild(windWrapper);
	additionalInfoContainer.appendChild(cloudinessWrapper);
	additionalInfoContainer.appendChild(sunriseWrapper);
	additionalInfoContainer.appendChild(sunsetWrapper);
	infoContainer.appendChild(additionalInfoContainer);
}

function createWeeklyForecast() {
	const weeklyContainer = createElement("div", "weekly-container");

	for (const [index, forecast] of currForecastWeatherList.entries()) {
		// Skip the first index since it is the current date
		if (index != 0) {
			const rowContainer = createElement("div", "row-container");

			// Produce the list of days into the row
			const day = createElement("p", "forecast-day");
			day.textContent = getDateToDay(forecast.dt);
			rowContainer.appendChild(day);

			// Produce day's forecast icon
			const dayWeatherIcon = createElement("img", "forecast-weather-icon");
			dayWeatherIcon.src = " https://openweathermap.org/img/wn/" + getWeatherIcon(index) + "@2x.png";
			rowContainer.appendChild(dayWeatherIcon);

			// Produce the max and min temp for the day
			const tempContainer = createElement("div", "forecast-temp-container");
			const maxTemp = createElement("p", "forecast-max-temp");
			const minTemp = createElement("p", "forecast-min-temp");
			maxTemp.textContent = createHighTemp(index);
			minTemp.textContent = createLowTemp(index);
			tempContainer.appendChild(maxTemp);
			tempContainer.appendChild(minTemp);
			rowContainer.appendChild(tempContainer);

			weeklyContainer.appendChild(rowContainer);
		}
	}
	infoContainer.appendChild(weeklyContainer);
}

function getWeatherIcon(index) {
	return `${currForecastWeatherList[index].weather[0].icon}`;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createMainTempType() {
	const temp = createElement("p", `temp-${tempVersion}`);
	temp.classList.add("main-temp");
	if (tempSymbol == "F") {
		temp.textContent = `${currWeatherDetail.current.temp_f}°${tempSymbol}`;
	} else {
		temp.textContent = `${currWeatherDetail.current.temp_c}°${tempSymbol}`;
	}
	return temp;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createFeelsLikeTempType() {
	if (tempSymbol == "F") {
		return `${currWeatherDetail.current.feelslike_f}°F`;
	}
	return `${currWeatherDetail.current.feelslike_c}°C`;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createAvgTemp() {
	if (tempSymbol == "F") {
		return `${currForecastDetail.forecast.forecastday[0].day.avgtemp_f}°F`;
	}
	return `${currForecastDetail.forecast.forecastday[0].day.avgtemp_c}°C`;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createHighTemp(index) {
	const kelvin = currForecastWeatherList[index].temp.max;
	const convertedTemp = convertKelvin(kelvin, tempSymbol);
	return `${convertedTemp}°${tempSymbol}`;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createLowTemp(index) {
	const kelvin = currForecastWeatherList[index].temp.min;
	const convertedTemp = convertKelvin(kelvin, tempSymbol);
	return `${convertedTemp}°${tempSymbol}`;
}

function createWindSpeed() {
	if (tempSymbol == "F") {
		return `${currForecastDetail.forecast.forecastday[0].day.maxwind_mph} mph`;
	}
	return `${currForecastDetail.forecast.forecastday[0].day.maxwind_kph} km/h`;
}

function removeWeatherInfo() {
	while (infoContainer.hasChildNodes()) {
		infoContainer.removeChild(infoContainer.firstElementChild);
	}
	while (headerContainer.hasChildNodes()) {
		headerContainer.removeChild(headerContainer.firstElementChild);
	}
}

function createWrapperContainer(name, imgSrc, contentInfo) {
	const wrapper = createElement("div", "wrapper-container");
	const labelName = createElement("p", `${name}-label`);
	const img = createElement("img", `${name}-img`);
	const info = createElement("p", `${name}`);
	labelName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
	img.src = imgSrc;
	info.textContent = contentInfo;
	wrapper.appendChild(labelName);
	wrapper.appendChild(img);
	wrapper.appendChild(info);
	return wrapper;
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
