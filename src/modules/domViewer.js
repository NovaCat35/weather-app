import { formatDate, getDateToDay } from "./dateController.js";

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
	createLocation();
	createTempConditions();
	createAdditionalInfo();
	createWeeklyForecast();
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
	const feelsLikeTemp = createFeelsLikeTempType();
	const avgTemp = createAvgTemp();
	const highTemp = createElement("p", "high-temp");
	highTemp.textContent = `High of ${createHighTemp(0)}`;
	const lowTemp = createElement("p", "high-temp");
	lowTemp.textContent = `Low of ${createLowTemp(0)}`;

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

	const humidityWrapper = createElement("div", "wrapper-container");
	const humidityLabel = createElement("p", "humidity-label");
	const humidity = createElement("p", "humidity");
	humidityLabel.textContent = "Humidity";
	humidity.textContent = `${currWeatherDetail.current.humidity}%`;
	humidityWrapper.appendChild(humidityLabel);
	humidityWrapper.appendChild(humidity);

	const precipitationWrapper = createElement("div", "wrapper-container");
	const precipitationLabel = createElement("p", "precipitation-label");
	const precipitation = createElement("p", "precipitation");
	precipitationLabel.textContent = "Chance of rain";
	precipitation.textContent = `${currForecastDetail.forecast.forecastday[0].day.daily_chance_of_rain}%`;
	precipitationWrapper.appendChild(precipitationLabel);
	precipitationWrapper.appendChild(precipitation);

	const windWrapper = createElement("div", "wrapper-container");
	const windLabel = createElement("p", "wind-label");
	const wind = createElement("p", "wind");
	windLabel.textContent = "Wind speed";
	wind.textContent = createWindSpeed();
	windWrapper.appendChild(windLabel);
	windWrapper.appendChild(wind);

	const cloudinessWrapper = createElement("div", "wrapper-container");
	const cloudinessLabel = createElement("p", "cloudiness-label");
	const cloudiness = createElement("p", "cloudiness");
	cloudinessLabel.textContent = "Cloudiness";
	cloudiness.textContent = `${currWeatherDetail.current.cloud}%`;
	cloudinessWrapper.appendChild(cloudinessLabel);
	cloudinessWrapper.appendChild(cloudiness);

	const sunriseWrapper = createElement("div", "wrapper-container");
	const sunriseLabel = createElement("p", "sunrise-label");
	const sunrise = createElement("p", "sunrise");
	sunriseLabel.textContent = "Sunrise";
	sunrise.textContent = `${currForecastDetail.forecast.forecastday[0].astro.sunrise}`;
	sunriseWrapper.appendChild(sunriseLabel);
	sunriseWrapper.appendChild(sunrise);

	const sunsetWrapper = createElement("div", "wrapper-container");
	const sunsetLabel = createElement("p", "sunset-label");
	const sunset = createElement("p", "sunset");
	sunsetLabel.textContent = "Sunset";
	sunset.textContent = `${currForecastDetail.forecast.forecastday[0].astro.sunset}`;
	sunsetWrapper.appendChild(sunsetLabel);
	sunsetWrapper.appendChild(sunset);

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
	// const date = currForecastDetail.forecast.forecastday[1].date;
	const forecastDayList = currForecastDetail.forecast.forecastday;

	for (const [index, forecast] of forecastDayList.entries()) {
      // Skip the first index since it is the current date
		if (index != 0) {
			const rowContainer = createElement("div", "row-container");

			// Produce the list of days into the row
			const day = createElement("p", "forecast-day");
			day.textContent = getDateToDay(forecast.date);
			rowContainer.appendChild(day);

			// Produce day's forecast icon
			const dayWeatherIcon = createElement("img", "forecast-weather-icon");
			dayWeatherIcon.src = "https:" + getWeatherIcon(index);
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
	return `${currForecastDetail.forecast.forecastday[index].day.condition.icon}`;
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
	const feelsLikeTemp = createElement("p", "feels-like-info");
	if (tempSymbol == "F") {
		feelsLikeTemp.textContent = `Feels like ${currWeatherDetail.current.feelslike_f}°F`;
	} else {
		feelsLikeTemp.textContent = `Feels like ${currWeatherDetail.current.feelslike_c}°C`;
	}
	return feelsLikeTemp;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createAvgTemp() {
	const avgTemp = createElement("p", "avg-temp");
	if (tempSymbol == "F") {
		avgTemp.textContent = `Average of ${currForecastDetail.forecast.forecastday[0].day.avgtemp_f}°F`;
	} else {
		avgTemp.textContent = `Average of ${currForecastDetail.forecast.forecastday[0].day.avgtemp_c}°C`;
	}
	return avgTemp;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createHighTemp(index) {
	if (tempSymbol == "F") {
		return `${currForecastDetail.forecast.forecastday[index].day.maxtemp_f}°F`;
	}
	return `${currForecastDetail.forecast.forecastday[index].day.maxtemp_c}°C`;
}

// *** We Fill in the info for temp base on "Fahrenheit" or "Celsius" ***
function createLowTemp(index) {
	if (tempSymbol == "F") {
		return `${currForecastDetail.forecast.forecastday[index].day.mintemp_f}°F`;
	}
	return `${currForecastDetail.forecast.forecastday[index].day.mintemp_c}°C`;
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
