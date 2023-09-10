import { createWeatherInfo, removeWeatherInfo } from "./domViewer.js";
import changeBackground from "./backgroundHandler.js";

const API_KEY = process.env.API_KEY;
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
 * @param {string} initialLocation - the city's name
 */
function initLocation(initialLocation) {
	fetchInfo(initialLocation).then((response) => {
		console.log(`We're in: ${response}`);
		console.log(prevLocation);
		if (initialLocation != null) {
			prevLocation = initialLocation;
		}
		let [currWeatherDetail, forecastWeatherDetail] = response;
		removeWeatherInfo(); // reset the DOM info
		changeBackground(forecastWeatherDetail); // for some reason, the forecastWeather has more accurate condition info
		createWeatherInfo(currWeatherDetail, forecastWeatherDetail);
	});
}

async function fetchInfo(location = null) {
	let currResponsePromise = null;
	let forecastResponsePromise = null;
	console.log(prevLocation);
	try {
		// The first request once the page loads is the initial default location zip: 07871
		if (location) {
			currResponsePromise = fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`, {
				mode: "cors",
			});
			forecastResponsePromise = fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=8`, {
				mode: "cors",
			});
		} else {
			// IF no location entered, we will call later functions to call up the previous location (this can be the default location zip: 07871)
			throw new Error("Invalid input");
		}
		const [currResponse, forecastResponse] = await Promise.all([currResponsePromise, forecastResponsePromise]);
		if (!currResponse.ok || !forecastResponse.ok) {
			throw new Error(`HTTP error! status: ${currResponse.status}`);
		}
		return await Promise.all([currResponse.json(), forecastResponse.json()]);
	} catch (err) {
		alert(`${err}. Please try again.`);
		return Promise.reject("error");
	}
}

export { handleSubmit, initLocation };
