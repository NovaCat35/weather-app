import { createWeatherInfo, removeWeatherInfo, showError } from "./domViewer.js";

const API_KEY = process.env.API_KEY;
const searchInput = document.querySelector('input[type="search"]');

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
 *
 * @param {string} initialLocation - the city's name
 * @param {string } initialZip  - the zipcode (USA) in 5 digit number
 */
function initLocation(initialLocation, initialZip) {
	fetchInfo(initialLocation, initialZip);
}

async function fetchInfo(location, zip = null) {
	let currResponsePromise = null;
	let forecastResponsePromise = null;
	try {
		if (zip) {
			currResponsePromise = fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${zip}`);
			forecastResponsePromise = fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${zip}&days=8`);
		} else {
			currResponsePromise = fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
			forecastResponsePromise = fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=8`);
		}

		const [currResponse, forecastResponse] = await Promise.all([currResponsePromise, forecastResponsePromise]);
		const [currWeatherDetail, forecastWeatherDetail] = await Promise.all([currResponse.json(), forecastResponse.json()]);

		removeWeatherInfo(); // reset the DOM info
		createWeatherInfo(currWeatherDetail, forecastWeatherDetail);
	} catch (err) {
		alert("Please enter a valid city's name");
		throw new Error(err);
	}
}

export { handleSubmit, initLocation };
