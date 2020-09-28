import { domNodes } from "./base";
export const getInput = function () {
  return domNodes.searchInput.value;
};

export function clearInput() {
  domNodes.searchInput.value = "";
}
// function recipeTitleHandler(recipe, limit = 18) {
//   var recipeTitle;
//   var limitTitle = limit;
//   if (recipe.title.length > limit) {
//     for (var i = limitTitle; i > 0; i--) {
//       if (recipe.title.charAt(i) === " ") {
//         console.log(limitTitle);
//         limitTitle = i;
//         recipeTitle = recipe.title.slice(0, limitTitle) + "...";
//         break;
//       }
//     }
//     return recipeTitle;
//   }

//   return recipe.title;
// }

export function titleShortenHandler(title, limit = 17) {
  const titleWords = title.split(" ");
  let fixedTitle = " ";
  if (title.length > limit) {
    titleWords.reduce((prev, current) => {
      if (fixedTitle.length + current.length < limit) {
        fixedTitle = prev + " " + current;
        return fixedTitle;
      } else {
        return fixedTitle;
      }
    });
    return fixedTitle + "...";
  } else return title;
}

export const renderRecipe = (recipe) => {
  let htmlcontent;
  htmlcontent = `<li>  
            <a class="results__link"  href="#${recipe.recipe_id}">
              <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
              </figure>
              <div class="results__data">
                <h4 class="results__name">${titleShortenHandler(
                  recipe.title
                )}</h4>
                <p class="results__author">${recipe.publisher}</p>
              </div>
            </a>
    
    </li> `;
  domNodes.resultsList.insertAdjacentHTML("beforeend", htmlcontent);
};
// export function switchPageRecipe(type) {
//   // const buttonPage = domNodes.resultsPage.querySelector(`.results__btn--${type}`);
//   buttonPage.addEventListener("click", (recipesList) => {});
// }

function createPaginationButton(type, page) {
  return ` <button class="btn-inline results__btn--${type}"  data-goto = ${
    type === "prev" ? page - 1 : page + 1
  }>
                    <span>Page ${type === "prev" ? page - 1 : page + 1} </span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${
                          type === "prev" ? "left" : "right"
                        }"></use>
                    </svg>
                </button>`;
}

function renderPageButtons(page, numberOfResults, resultsPerPage) {
  let htmlButtonSlider;
  const pages = Math.ceil(numberOfResults / resultsPerPage);
  if (page === 1 && pages > 1) {
    htmlButtonSlider = createPaginationButton("next", page);
  } else if (page < pages) {
    htmlButtonSlider = `${createPaginationButton("next", page)}
                         ${createPaginationButton("prev", page)}`;
  } else if (page === pages && pages > 1) {
    htmlButtonSlider = createPaginationButton("prev", page);
  }

  domNodes.resultsPage.insertAdjacentHTML("afterbegin", htmlButtonSlider);
}

export function renderRecipes(recipesList, page = 1, resultsPerPage = 10) {
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  const recipesPage = recipesList.slice(start, end);

  recipesPage.forEach(renderRecipe);
  renderPageButtons(page, recipesList.length, resultsPerPage);
}

export function clearResults() {
  const recipesList = domNodes.resultsList;
  let recipeNode = recipesList.firstElementChild;
  while (recipeNode) {
    recipesList.removeChild(recipeNode);
    recipeNode = recipesList.firstElementChild;
  }
}
