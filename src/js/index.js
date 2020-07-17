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
import showHideModal from './views/click'
import localData from './config/LocalData'
import {
  validationForm,
  sendCallForm
} from './views/form'

const hellopreloader = document.getElementById("hellopreloader_preload");

function fadeOutnojquery(el) {
  el.style.opacity = 1;
  const interhellopreloader = setInterval(function () {
    el.style.opacity = el.style.opacity - 0.05;
    if (el.style.opacity <= 0.05) {
      clearInterval(interhellopreloader);
      hellopreloader.style.display = "none";
    }
  }, 16);
}
window.onload = function () {

  const formFooter = document.forms.form_footer;
  const formSicial = document.forms.form_social;
  const mian = document.querySelector('.main')
  const social = document.querySelector('.social')

  // Render for Categories
  api.getCategories().then((response) => {
    getData(response.data, mian)
    if (response.status === 200) {
      fadeOutnojquery(hellopreloader);
    }
  })
}
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

// Render for localData
const telephone = document.getElementById('footer-telephone')
const email = document.getElementById('footer-email')
const address = document.getElementById('footer-address')
const schedule = document.getElementById('footer-schedule')
const instagram = document.getElementById('instagram')
const facebook = document.getElementById('facebook')
const map = document.getElementById('social-map')

telephone.textContent = localData.telephone
telephone.setAttribute('href', `tel:${localData.telephone}`)
email.setAttribute('href', `mailto:${localData.email}`)
email.textContent = localData.email
address.textContent = localData.address
schedule.textContent = localData.schedule
instagram.setAttribute('href', localData.instagram)
facebook.setAttribute('href', localData.facebook)
map.setAttribute('src', localData.map)


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