import {handleSubmit} from './apiHandler.js';
import {handleToggle} from './domViewer.js';

function attachListenerToForm() {
   const form = document.querySelector("form");
   form.addEventListener('submit', handleSubmit)
}

function attachListenerToToggleBtn() {
   const toggleBtn = document.querySelector("input[type='checkbox']");
   toggleBtn.addEventListener('click', () => {
      if(toggleBtn.checked) {
         handleToggle("celsius")
      } else {
         handleToggle("fahrenheit")
      }
   })
}

export {attachListenerToForm, attachListenerToToggleBtn}