import {attachListenerToForm} from './modules/eventController.js'
import initWebpage from './modules/init.js'
// LOGIC
// 1) Submit -> check value of the input
// 2) fetch location of input for weather API
// 3) FETCH INFO: temp, cloud status, humidity, sunrise, sunset

// Aesthetics
// Img to indicate weather

initWebpage();
attachListenerToForm();


