function showHideModal(cls) {
  const element = document.querySelector(cls)
  const clos = element.querySelector('.fa-times')

  function closeWindow() {
    element.classList.remove('zoomIn')
    element.style.display = 'none';
  }

  element.classList.add('zoomIn')
  element.style.display = 'block'
  clos.addEventListener('click', function () {
    closeWindow()
  })

  document.addEventListener('keydown', function (event) {
    if (event.code == 'Escape' || event.keyCode == 27) {
      closeWindow()
    }
  });
}

export default showHideModal