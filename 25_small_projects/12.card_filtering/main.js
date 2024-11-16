import { CARDS, CATEGORIES } from "./constants.js";

function main() {
  const filterBtnsContainer = document.querySelector(".filter-buttons-wrapper");
  const contentWrapper = document.querySelector(".content-wrapper");
  createCategory(filterBtnsContainer);
  createContent(contentWrapper);

  const allFilterBtns = document.querySelectorAll(".filter-button");
  const allCards = document.querySelectorAll(".card");

  console.log(allCards, allFilterBtns);

  allFilterBtns.forEach((filterBtnItem) => {
    filterBtnItem.addEventListener("click", () => {
      const exraCurrentCategory = filterBtnItem.dataset.filter;

      console.log(exraCurrentCategory);
      filterCardsByCategory(exraCurrentCategory, allCards);
    });
  });
}

function createCategory(container) {
  CATEGORIES.forEach((category) => {
    const buttomElem = document.createElement("button");

    buttomElem.innerText = category;
    buttomElem.classList.add("filter-button");
    buttomElem.setAttribute("data-filter", category);

    container.appendChild(buttomElem);
  });
}

function createContent(contentWrapper) {
  CARDS.forEach((card) => {
    const singleCardItem = document.createElement("div");
    singleCardItem.classList.add("card", card.id);
    singleCardItem.textContent = card.label;

    contentWrapper.appendChild(singleCardItem);
  });
}

function filterCardsByCategory(exraCurrentCategory, allCards) {
  allCards.forEach((item) => {
    const isShowAllCards = exraCurrentCategory.toLowerCase() === "all";
    const isItemsFiltered = !item.classList.contains(exraCurrentCategory);

    if (isItemsFiltered && !isShowAllCards) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
  });
}

main();
