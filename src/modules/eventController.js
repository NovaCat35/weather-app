import {handleSubmit} from './apiHandler.js';

function attachListenerToForm() {
   const form = document.querySelector("form");
   form.addEventListener('submit', handleSubmit)
}

export {attachListenerToForm}