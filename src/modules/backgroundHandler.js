export default function changeBackground(forecastWeatherDetail) {
	const bodyTag = document.querySelector("body");
	const conditionInfoDetails = forecastWeatherDetail.forecast.forecastday[0].day.condition.text.toLowerCase();
	const dayTime = forecastWeatherDetail.current.is_day;

	if (conditionInfoDetails.includes("rain") || conditionInfoDetails.includes("thunder") || conditionInfoDetails.includes("snow")) {
      bodyTag.className = "rain";
      return;
	} else if (conditionInfoDetails.includes("sunny") && dayTime) {
		bodyTag.className = "sunny";
      return;
	} else if (dayTime) {
		bodyTag.className = "day";
      return;
	} else {
		bodyTag.className = "night";
      return;
	}
}
