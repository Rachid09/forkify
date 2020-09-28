// Global app controller
import Search from "./models/search";
import * as searchView from "./view/searchView";
import Recipe from "./models/recipe";
import {
  spinnerLoading,
  spinnerRemove,
  domNodes,
  removePaginationButtons,
} from "./view/base";
import * as recipeView from "./view/recipeView";
import Shoppinglist from "./models/shopppingList";
import * as listView from "./view/shoppingListView";
import Likes from "./models/likes";
import * as likesView from "./view/likesView";

const state = {};
/* Global state of my app 
Search object
Shopping list
recipe current object
liked recipes
*/

// search controller

const searchHandler = async function () {
  const query = searchView.getInput();

  state.search = new Search(query);
  searchView.clearInput();
  searchView.clearResults();
  removePaginationButtons();

  spinnerLoading(domNodes.resultsContainer);
  const recipes = await state.search.getSearchResults();
  spinnerRemove();
  searchView.renderRecipes(recipes);
};

domNodes.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchHandler();
});

domNodes.resultsPage.addEventListener("click", (event) => {
  const buttonPage = event.target.closest("button");
  if (buttonPage) {
    const pageNumber = parseInt(buttonPage.dataset.goto);

    removePaginationButtons();
    searchView.clearResults();
    searchView.renderRecipes(state.search.recipes, pageNumber, 10);
  }
});

// Recipe controller

state.likes = new Likes();
const recipeHandler = async function () {
  let location = window.location;
  const newHash = location.hash.slice(1);

  if (newHash) {
    if (state.search) {
      recipeView.highlightRecipeResult(newHash);
    }
    state.recipe = new Recipe(newHash);
    recipeView.clearRecipe();
    spinnerLoading(domNodes.recipePage);
    await state.recipe.getRecipeInfo();
    state.recipe.calcTime();
    state.recipe.calcServings();
    state.recipe.parseIngredients();
    spinnerRemove();

    const isLiked = state.likes.isLiked(state.recipe.id);
    recipeView.exploreRecipe(state.recipe, isLiked);
    console.log(state.recipe);
  }
};
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, recipeHandler);
});

// window.addEventListener("hashchange", (event) => {
//   recipeHandler();
//   if (location.hash) {
//     const oldUrl = event.oldURL;
//     const [url, oldHash] = oldUrl.split("#");
//     console.log(oldHash);
//     recipeView.deleteHighlightingRecipe(oldHash);
//   }
// });

// window.addEventListener("load", recipeHandler);

// shoppingList controller
function ListHandler() {
  state.shoppingList = new Shoppinglist();

  state.recipe.ingredients.forEach((ingredient) => {
    state.shoppingList.addItems(
      ingredient.count,
      ingredient.unit,
      ingredient.text
    );
  });
  listView.createShoppingList(state.shoppingList.items);
}

domNodes.recipePage.addEventListener("click", (event) => {
  const btnPlus = event.target.closest(".plus-button");
  const minusBtn = event.target.closest(".minus-button");
  if (btnPlus) {
    state.recipe.updateServingsIngredients("inc");
    recipeView.updateServingsIngredientsUI(state.recipe);
    console.log(state.recipe);
  }
  if (minusBtn && state.recipe.servings > 1) {
    state.recipe.updateServingsIngredients("dec");
    recipeView.updateServingsIngredientsUI(state.recipe);
    console.log(state.recipe);
  }

  const btnShoppingList = event.target.closest(".shoppingList__Button");
  if (btnShoppingList) {
    ListHandler();
  }
  const btnLike = event.target.closest(".recipe__love");

  if (btnLike) {
    likesHandler();
  }
});

domNodes.shoppingList.addEventListener("click", (event) => {
  const deletItem = event.target.closest(".shopping__item");
  const id = deletItem.id;
  if (event.target.matches(".shopping__delete , .shopping__delete *")) {
    state.shoppingList.deleteItems(id);
    listView.deleteListItemUI(id);
    listView.clearScrollBar();
  }

  const countEL = event.target.closest(".shopping__count-value");
  if (countEL) {
    const value = parseFloat(
      document.querySelector(".shopping__count-value").value
    );
    state.shoppingList.updateIngredientsCount(id, value);
  }
});

//likes Controller
const likesHandler = function () {
  if (!state.likes) {
    state.likes = new Likes();
  }

  if (!state.likes.isLiked(state.recipe.id)) {
    const recipeInfo = state.likes.addRecipeToFavorites(
      state.recipe.id,
      state.recipe.title,
      state.recipe.img_Url,
      state.recipe.publisher
    );

    likesView.likeButtonHandler(false);
    likesView.createFavoriteRecipeUI(recipeInfo);
  } else {
    state.likes.deleteRecipeFromFavorites(state.recipe.id);
    likesView.likeButtonHandler(true);
    likesView.deleteRecipeFromFavoriteUI(state.recipe.id);
  }
};
