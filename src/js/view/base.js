export const domNodes = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  resultsContainer: document.querySelector(".results"),
  resultsList: document.querySelector(".results__list"),
  resultsElement: document.querySelector("li"),
  spinnerLoader: document.querySelector(".loader"),
  resultsPage: document.querySelector(".results__pages"),
  recipePage: document.querySelector(".recipe"),
  servingButtons: document.querySelector(".recipe__info-buttons"),
  recipeInfo: document.querySelector(".recipe__info"),
  shoppingList: document.querySelector(".shopping__list"),
  likeSvg: document.querySelector(".recipe__love"),
  likeList: document.querySelector(".likes__list"),
};

export function spinnerLoading(parentNode) {
  const spinnerElement = ` <div class="loader">
              <svg>
              <use href="img/icons.svg#icon-cw"></use>
              </svg>
              </div>`;

  parentNode.insertAdjacentHTML("afterbegin", spinnerElement);
}

export function spinnerRemove() {
  const spinner = document.querySelector(".loader");

  if (spinner) spinner.remove();
}

export function removePaginationButtons() {
  const resultsPages = domNodes.resultsPage;
  let paginationButton = resultsPages.firstElementChild;
  while (paginationButton) {
    resultsPages.removeChild(paginationButton);
    paginationButton = resultsPages.firstElementChild;
  }
}

// export function hideSpinner(spinner) {
//   spinner.class;
// }

// results;
// results__list;
// results__link;
// results__fig;
// results__data;
// results__name;
// results__author;
