import '../style/reset.css'
import '../style/index.css'

import "../img/open-menu.svg"
import "../img/favicon-32x32.png"
import "../img/facebook.svg"
import "../img/instagram.svg"
import "../img/google-maps.svg"
import "../img/telephone.svg"
import "../img/logo.png"

import "../img/0.jpeg"
import "../img/1.jpeg"
import "../img/2.jpeg"
import "../img/3.jpeg"
import "../img/4.jpeg"
import "../img/5.jpeg"

import "../img/tail-spin.svg"
import "../img/clock.svg"
import "../img/map.svg"
import "../img/mail.svg"
import "../img/smartphone.svg"

import wow from './plugins/wow'
import api from './services/Api'
import getData from './views/categories'
import showHideModal from './views/click'
import localData from './config/LocalData'
import {
  validationForm,
  sendCallForm
} from './views/form'

const formFooter = document.forms.form_footer;
const formSicial = document.forms.form_social;
const categories = document.querySelector('.categories')
const social = document.querySelector('.social')


categories.classList.add("preloader")
window.onload = function () {

  // Render for Categories
  api.getCategories().then((response) => {
    getData(response.data, categories)
    if (response.status === 200) {
      console.info(`Get categories status = ${response.status}`);
      categories.classList.remove("preloader")
    }
  })
}

// document.addEventListener("DOMContentLoaded", () => {
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
  // e.stopPropagation();
  const parent = e.target.parentNode;
  const objectCall = validationForm(e);
  if (objectCall) {
    sendCallForm(objectCall)
    if (parent.classList.contains('call')) {
      parent.style.display = 'none'
    }
  }
}

// block social jumping
window.addEventListener('scroll', function () {
  if (window.innerWidth > 640) {

    if (document.documentElement.scrollTop > 200) {
      social.style.top = '5px'
    }
    if (document.documentElement.scrollTop < 200) {
      social.style.top = '200px'
    }
  }
  if (window.innerWidth < 640) {
    if (document.documentElement.scrollTop > 140) {
      social.style.top = '5px'
    }
    if (document.documentElement.scrollTop < 200) {
      social.style.top = '140px'
    }
  }
});

wow.init();
console.info("index ok");
// })