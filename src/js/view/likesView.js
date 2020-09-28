import { domNodes } from "./base";
import { titleShortenHandler } from "./searchView";

export function likeButtonHandler(isLiked) {
  const svgButtonLike = document.querySelector(".header__likes");
  console.log(isLiked);
  if (isLiked) {
    svgButtonLike.firstElementChild.setAttribute(
      "href",
      "img/icons.svg#icon-heart-outlined"
    );
  } else {
    svgButtonLike.firstElementChild.setAttribute(
      "href",
      "img/icons.svg#icon-heart"
    );
  }
}

export function createFavoriteRecipeUI(recipeInfo) {
  let likedRecipeMarkup = `
                       <li>
                           <a class="likes__link" href="#${recipeInfo.id}">
                               <figure class="likes__fig">
                                   <img src="${recipeInfo.imgUrl}" alt="Test">
                               </figure>
                               <div class="likes__data">
                                   <h4 class="likes__name">${titleShortenHandler(
                                     recipeInfo.title
                                   )}</h4>
                                   <p class="likes__author">${
                                     recipeInfo.author
                                   }</p>
                               </div>
                           </a>
                       </li>
                       `;
  domNodes.likeList.insertAdjacentHTML("beforeend", likedRecipeMarkup);
}

export function deleteRecipeFromFavoriteUI(id) {
  const deletedNode = document.querySelector(`.likes__link[href*="${id}"]`)
    .parentElement;
  deletedNode.remove();
}
