import { createWeatherInfo, removeWeatherInfo } from "./domViewer.js";
import changeBackground from "./backgroundHandler.js";

const API_KEY1 = process.env.API_KEY1;
const API_KEY2 = process.env.API_KEY2;
const searchInput = document.querySelector('input[type="search"]');
let prevLocation = null;
/*
 * Listener for "submit" from search bar happens here.
 * The goal is to get the city's info and call the function that fetch the request from the API
 */
function handleSubmit(event) {
	event.preventDefault();
	const searchInput = document.querySelector('input[type="search"]');
	const location = searchInput.value;
	initLocation(location);
}

/**
 * @param {string} initialLocation - the city's name or zipc ode
 */
function initLocation(initialLocation) {
	fetchInfo(initialLocation).then((response) => {
		// In case submitted location is null, we keep a record of the previous location
		if (initialLocation != null) {
			prevLocation = initialLocation;
		}
		let [currWeatherDetail, forecastWeatherDetail, forecastWeatherList] = response;
		removeWeatherInfo(); // reset the DOM info
		changeBackground(forecastWeatherDetail); // for some reason, the forecastWeather has more accurate condition info
		createWeatherInfo(currWeatherDetail, forecastWeatherDetail, forecastWeatherList);
	});
}

async function fetchInfo(location = null) {
	let currResponsePromise = null;
	let forecastResponsePromise = null;
	try {
		// The first request once the page loads is the initial default location zip: 07871
		if (location) {
			currResponsePromise = fetchAPI(`https://api.weatherapi.com/v1/current.json?key=${API_KEY1}&q=${location}`)
			forecastResponsePromise = fetchAPI(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY1}&q=${location}&days=8`)
		} else {
			// IF no location entered, we will call later functions to call up the previous location (this can be the default location zip: 07871)
			throw new Error("Invalid input");
		}
		const [currResponse, forecastResponse] = await Promise.all([currResponsePromise, forecastResponsePromise]);
		if (!currResponse.ok || !forecastResponse.ok) {
			throw new Error(`HTTP error! status: ${currResponse.status}`);
		}
		const [currResponseJson, forecastResponseJson] = await Promise.all([currResponse.json(), forecastResponse.json()]);
		// Call other weekly API forecast using the lat & lon of the currentAPI...cause it's free :)
		let weeklyForecastList = await fetchWeeklyForecast(currResponseJson)
		return [currResponseJson, forecastResponseJson, weeklyForecastList]

	} catch (err) {
		alert(`${err}. Please try again.`);
		return Promise.reject("error");
	}
}

// Update: the other forecast call free trial ran out...so Im using another free one for weekly forecast
async function fetchWeeklyForecast(currForecastDetail){
	const [lat, lon] = getCoordinate(currForecastDetail);
	const forecastPromise2 = await fetchAPI(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY2}&exclude=hourly,minutely`)
	const forecastResponse2 = await forecastPromise2.json()
	return forecastResponse2.daily;
}

function fetchAPI(link) {
	const responsePromise = fetch(link, {
		mode: "cors",
	});
	return responsePromise;
}

function getCoordinate(currForecastDetail) {
	const lat = currForecastDetail.location.lat;
	const lon = currForecastDetail.location.lon;
	return [lat, lon];
}
export { handleSubmit, initLocation, fetchWeeklyForecast };
