function getData(list, main) {
  // Принимает массив response.data и css selector
  const fragment = document.createDocumentFragment();

  list.forEach(object => {
    fragment.appendChild(createArticle(object));
  });

  main.appendChild(fragment);
}

function createArticle(object) {
  const article = document.createElement("article");
  article.classList.add("article", "wow", "scale-in-ver-bottom")
  article.setAttribute("id", object.id)
  article.setAttribute("data-wow-offset", "222")
  article.insertAdjacentHTML("afterbegin",
    `
  <div class="article__img">
      <img src="${object.img}" alt="" class="img" />
    </div>
    <div class="article__content">
     <!-- <a href="" class="article__link"> -->
        <h2 class="article__title h2">
          ${object.title} <i class="fas fa-long-arrow-alt-right"></i>
        </h2>
      <!-- </a> -->
      <p class="article__text">${object.description}</p>
    </div>
    `)
  return article;
}

export default getData