const template = `
<div class="row">
  <ul class="contact">
    <li class="contact__item">
      <i class="fas fa-mobile-alt"></i>
      <a href="tel:+380963128203" class="contact__link"
        >+38(096)-312-82-03
      </a>
    </li>
    <li class="contact__item">
      <i class="far fa-envelope"></i>
      <a href="mailto:profy.shop.top@gmail.com" class="contact__link">
        profy.shop.top@gmail.com
      </a>
    </li>
    <li class="contact__item">
      <i class="fas fa-map-marked-alt"></i>
      <!-- <a href="" class="contact__link"></a> -->
      ул. Космонавтов 124 Б, офис 2
    </li>
    <li class="contact__item">
      <i class="far fa-clock"></i>
      <span class="contact__text">10.00 - 17.00</span>
    </li>
  </ul>
  <form class="form" name="form_footer">
    <div class="form__item">
      <input
        type="text"
        name="call__text"
        id="call__text"
        placeholder="Ваше Имя"
      />
    </div>
    <div class="form__item">
      <input
        type="tel"
        name="call__tel"
        id="call__tel"
        placeholder="+38(050)-123-23-34"
      />
    </div>
    <div class="form__item" hidden>
      <textarea
        name="comment"
        rows="3"
        placeholder="Комментарий"
      ></textarea>
    </div>
    <div class="form__item">
      <input type="submit" value="Жду Звонка" />
    </div>
  </form>
</div>
<div class="footer__line"></div>
<div class="copyright">
  <p class="copyright__item" style="color: #e74c3c;">
    Profy Shop <span style="color: white;">© 2020</span>
  </p>
  <a
    style="text-decoration: none; color: #e74c3c;"
    href="mailto:8th.port@gmail.com"
    class="copyright__link"
  >
    <span style="color: #3498db;">created 😜</span>
    <span style="color: white;">:</span>
    <span style="color: #e74c3c;"></span> 8-th Port</a
  >
</div>
`
function createFooter(footer, object) {
  footer.classList.add("footer", "wow", "scale-in-ver-bottom")
  footer.setAttribute("data-wow-offset", "100")
  footer.insertAdjacentHTML("afterbegin",
  `
<div class="row">
  <ul class="contact">
    <li class="contact__item">
      <i class="fas fa-mobile-alt"></i>
      <a href="tel:${object.telephone}" class="contact__link"
        >${object.telephone}
      </a>
    </li>
    <li class="contact__item">
      <i class="far fa-envelope"></i>
      <a href="mailto:${object.email}" class="contact__link">
        ${object.email}
      </a>
    </li>
    <li class="contact__item">
      <i class="fas fa-map-marked-alt"></i>
      <!-- <a href="" class="contact__link"></a> -->
      ${object.address}
    </li>
    <li class="contact__item">
      <i class="far fa-clock"></i>
      <span class="contact__text">${object.schedule}</span>
    </li>
  </ul>
  <form class="form" name="form_footer">
    <div class="form__item">
      <input
        type="text"
        name="call__text"
        id="call__text"
        placeholder="Ваше Имя"
      />
    </div>
    <div class="form__item">
      <input
        type="tel"
        name="call__tel"
        id="call__tel"
        placeholder="+38(050)-123-23-34"
      />
    </div>
    <div class="form__item" hidden>
      <textarea
        name="comment"
        rows="3"
        placeholder="Комментарий"
      ></textarea>
    </div>
    <div class="form__item">
      <input type="submit" value="Жду Звонка" />
    </div>
  </form>
</div>
<div class="footer__line"></div>
<div class="copyright">
  <p class="copyright__item" style="color: #e74c3c;">
    Profy Shop <span style="color: white;">© 2020</span>
  </p>
  <a
    style="text-decoration: none; color: #e74c3c;"
    href="mailto:8th.port@gmail.com"
    class="copyright__link"
  >
    <span style="color: #3498db;">created 😜</span>
    <span style="color: white;">:</span>
    <span style="color: #e74c3c;"></span> 8-th Port</a
  >
</div>
`
  )
  return footer;
}
formFooter.addEventListener("submit", getValueOnCall)
export default createFooter