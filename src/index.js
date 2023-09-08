import {attachListenerToForm, attachListenerToToggleBtn} from './modules/eventController.js'
import initWebpage from './modules/init.js'
import "./styles/website.scss";
import "./styles/weatherInfo.scss";
import "./styles/toggleBtn.scss";
import "./styles/options.scss";

// LOGIC
// 1) Submit -> check value of the input
// 2) fetch location of input for weather API
// 3) FETCH INFO: temp, cloud status, humidity, sunrise, sunset

// Aesthetics
// Img to indicate weather

initWebpage();
attachListenerToForm();
attachListenerToToggleBtn();

