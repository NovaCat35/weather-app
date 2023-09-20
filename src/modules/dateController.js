import { format, parse } from "date-fns";

// Format the default raw string value "yyyy-MM-dd" to --> LLL d, yyyy (shorthand for month)
function formatDate(rawDate) {
	let [dateString, timeString] = rawDate.split(" ");
	const date = parse(dateString, "yyyy-MM-dd", new Date());

	const formattedDate = format(date, "LLL d, yyyy");
	return formattedDate;
}

// Get today's date in yyyy-MM-dd format
function getTodayDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
	const day = String(today.getDate()).padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

// // Convert the date from number ####-##-## --> yyyy-MM-dd --> dayString
// function getDateToDay(dateString) {
// 	// Parse the date string into a JavaScript Date object
// 	const date = parse(dateString, "yyyy-MM-dd", new Date());

// 	// Format the date into a string representing the day of the week
// 	const dayOfWeek = format(date, "EEEE"); // "Tuesday"

//   return dayOfWeek;
// }

// Convert the date (Unix, UTC) to number ####-##-## -> yyyy-MM-dd --> dayString
function getDateToDay(unixTimestamp) {
	/* Create a new JavaScript Date object based on Unix timestamp.
	Multiplied it by 1000 to convert it into milliseconds */
	const date = new Date(unixTimestamp * 1000);
	const dayOfWeek = format(date, 'EEEE'); // "Tuesday"
	console.log(dayOfWeek)
	return dayOfWeek;
}

export { formatDate, getTodayDate, getDateToDay };
