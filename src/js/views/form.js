import api from '../services/Api'


function sendCallForm(object) {
  api.postCall(object).then((response) => {
    if (response.status === 201) {
      const div = document.createElement('div')
      div.classList.add("thank", "slideInRight")
      div.insertAdjacentHTML("afterbegin",
        `<p style="color: #e74c3c;">${object.name}</p>
      <p>спасибо за Ваше обращение, мы обязательно с Вами свяжемся в течении </p>
      <p style="color: #e74c3c;">10 минут</p>
      `)
      document.body.appendChild(div)
      setTimeout(function () {
        div.remove()
      }, 4000);
    }
  });
}

function errorInput(field) {
  field.classList.add('shake')
  setTimeout(function () {
    field.classList.remove('shake')
  }, 1000);
}

function clearFields(e) {
  e.target[0].value = ''
  e.target[1].value = ''
  e.target[2].value = ''
}

function validationForm(e) {
  const name = e.target[0].value
  const telephone = e.target[1].value
  let comment = e.target[2].value

  if (!name && !telephone) {
    errorInput(e.target)
  } else if (!name) {
    errorInput(e.target[0])
  } else if (!telephone) {
    errorInput(e.target[1])
  } else {
    if (!comment) {
      comment = 'Пустой коментарий'
      const object = {
        name,
        telephone,
        comment
      }
      clearFields(e)
      // console.log(object);
      return object
    } else {
      const object = {
        name,
        telephone,
        comment
      }
      clearFields(e)
      // console.log(object);
      return object
    }
  }
}

export {
  validationForm,
  sendCallForm
}

// // /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/