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
	fetchInfo(location);
}

/**
 * @param {string} initialLocation - the city's name
 */
function initLocation(initialLocation) {
	fetchInfo(initialLocation);
}

async function fetchInfo(location = null) {
	let currResponsePromise = null;
	let forecastResponsePromise = null;
	try {
		if (location) {
			currResponsePromise = fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`, {
				mode: "cors",
			});
			forecastResponsePromise = fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=8`, {
				mode: "cors",
			});
		} else {
			// IF location enter doesn't exist, we will pull up the previous location (this can be the default location zip: 07871)
			currResponsePromise = fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${prevLocation}`, {
				mode: "cors",
			});
			forecastResponsePromise = fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${prevLocation}&days=8`, {
				mode: "cors",
			});
		}
		const [currResponse, forecastResponse] = await Promise.all([currResponsePromise, forecastResponsePromise]);
		const [currWeatherDetail, forecastWeatherDetail] = await Promise.all([currResponse.json(), forecastResponse.json()]);

		removeWeatherInfo(); // reset the DOM info
		changeBackground(forecastWeatherDetail); // for some reason, the forecastWeather has more accurate condition info
		createWeatherInfo(currWeatherDetail, forecastWeatherDetail);
		prevLocation = location;
	} catch (err) {
		alert("An error has appear with the input or fetching request...please try again.");
		// Reboot last location
		currResponsePromise = fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${prevLocation}`, {
			mode: "cors",
		});
		forecastResponsePromise = fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${prevLocation}&days=8`, {
			mode: "cors",
		});
		const [currResponse, forecastResponse] = await Promise.all([currResponsePromise, forecastResponsePromise]);
		const [currWeatherDetail, forecastWeatherDetail] = await Promise.all([currResponse.json(), forecastResponse.json()]);
		changeBackground(forecastWeatherDetail); 
		createWeatherInfo(currWeatherDetail, forecastWeatherDetail);
	} 
}

export { handleSubmit, initLocation };
