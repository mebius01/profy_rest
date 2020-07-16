import '../style/index.scss'
import '../img/open-menu-1.png'
import "../img/favicon.png"
import "../img/facebook.svg"
import "../img/instagram.svg"
import "../img/google-maps.svg"
import "../img/telephone.svg"
import "../img/tail-spin.svg"

import wow from './plugins/wow'
import api from './services/Api'
import getData from './views/categories'
import {
  validationForm,
  sendCallForm
} from './views/form'
import showHideModal from './views/click'

const formFooter = document.forms.form_footer;
const formSicial = document.forms.form_social;
const mian = document.querySelector('.main')
const social = document.querySelector('.social')

// Render for Categories
api.getCategories().then((response) => {
  console.log(response.status);
  getData(response.data, mian)
})

// CLICK ON SOCIAL
social.addEventListener('click', getEventOnIcon)
function getEventOnIcon(event) {
  const parent = event.target.parentNode;
  if (parent.getAttribute('id') == "menu") {
    event.preventDefault()
    showHideModal('.menu')
  } else if (parent.getAttribute('id') == "map") {
    event.preventDefault()
    showHideModal('.map')

  } else if (parent.getAttribute('id') == "telephone") {
    event.preventDefault()
    showHideModal('.call')
  }
}

// Render for footer
const footer = document.querySelector('footer')

// SEND CALL FORM
formSicial.addEventListener("submit", getValueOnCall)
formFooter.addEventListener("submit", getValueOnCall)

function getValueOnCall(e) {
  e.preventDefault();
  e.stopPropagation();
  const parent = e.target.parentNode;
  const objectCall = validationForm(e);
  if (objectCall) {
    sendCallForm(objectCall)
    if (parent.classList.contains('call')) {
      parent.style.display = 'none'
    }
  }
}

wow.init();