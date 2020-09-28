import { domNodes } from "./base";
import { Fraction } from "fractional";

function formatCount(count) {
  let fraction;
  // count = count.toFixed(2);

  if (count) {
    const [integer, decimal] = count
      .toString()
      .split(".")
      .map((el) => parseInt(el));

    if (!decimal) {
      return count;
    } else if (integer === 0) {
      fraction = new Fraction(count);
      return `${fraction.numerator}/${fraction.denominator}`;
    } else {
      fraction = new Fraction(parseFloat(count - integer).toFixed(1));
      return `${integer} and ${fraction.numerator}/${fraction.denominator}`;
    }
  } else return "";
}

export function highlightRecipeResult(id) {
  const recipes = Array.from(document.querySelectorAll(`.results__link`));
  console.log(recipes);
  recipes.forEach((recipe) => {
    recipe.classList.remove("results__link--active");
  });
  const element = document.querySelector(`.results__link[href="#${id}"]`);
  element.classList.add("results__link--active");
}

function createRecipeIngList(ingArr) {
  let ingListContent = [];
  ingArr.forEach((ingObject) => {
    let ingItemMarkup = `<li class="recipe__item">
                             <svg class="recipe__icon">
                           <use href="img/icons.svg#icon-check"></use>
                       </svg>
                       <div class="recipe__count">${formatCount(
                         ingObject.count
                       )}</div>
                       <div class="recipe__ingredient">
                           <span class="recipe__unit">${ingObject.unit}</span>
                           ${ingObject.text}
                       </div>
                   </li>`;
    ingListContent.push(ingItemMarkup);
  });
  return ingListContent.join("");
}
function createRecipeUI(rec, isLiked) {
  let recipeContent = ` <figure class="recipe__fig">
                 <img src="${rec.img_Url}" alt="Tomato" class="recipe__img">
                 <h1 class="recipe__title">
                     <span>${rec.title}</span>
                 </h1>
             </figure>
              <div class="recipe__details">
                 <div class="recipe__info">
                     <svg class="recipe__info-icon">
                         <use href="img/icons.svg#icon-stopwatch"></use>
                     </svg>
                     <span class="recipe__info-data recipe__info-data--minutes">${rec.calcTime()}</span>
                     <span class="recipe__info-text"> minutes</span>
                 </div>

                   <div class="recipe__info">
                     <svg class="recipe__info-icon">
                         <use href="img/icons.svg#icon-man"></use>
                     </svg>
                     <span class="recipe__info-data recipe__info-data--people">${rec.calcServings()}</span>
                     <span class="recipe__info-text"> servings</span>

                     <div class="recipe__info-buttons">
                         <button class="btn-tiny minus-button">
                             <svg>
                                 <use href="img/icons.svg#icon-circle-with-minus"></use>
                             </svg>
                         </button>
                         <button class="btn-tiny plus-button">
                             <svg>
                                 <use href="img/icons.svg#icon-circle-with-plus"></use>
                             </svg>
                         </button>
                     </div>

                 </div>
                  <button class="recipe__love">
                   <svg class="header__likes">
                       <use href="img/icons.svg#icon-${
                         isLiked === false ? "heart-outlined" : "heart"
                       }"></use>
                   </svg>
               </button>
           </div>
           <div class="recipe__ingredients">
               <ul class="recipe__ingredient-list">
               ${createRecipeIngList(rec.ingredients)}

               </ul>
               <button class="btn-small recipe__btn shoppingList__Button">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${
                      rec.publisher
                    }</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${
                  rec.sourceUrl
                }" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>

                </div>`;

  domNodes.recipePage.insertAdjacentHTML("afterbegin", recipeContent);
}

export function clearRecipe() {
  domNodes.recipePage.innerHTML = "";
}

export function exploreRecipe(recipe, isLiked) {
  createRecipeUI(recipe, isLiked);
}

export function updateServingsIngredientsUI(rec) {
  //Update servings UI
  document.querySelector(
    ".recipe__info-data--people"
  ).textContent = rec.calcServings();
  //Update the ingredients count UI
  const ingredientList = [...document.querySelectorAll(".recipe__count")];
  ingredientList.forEach((ingCount, index) => {
    ingCount.textContent = formatCount(rec.ingredients[index].count);
  });
}
