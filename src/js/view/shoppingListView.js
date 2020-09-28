import { domNodes } from "./base";

export function createShoppingList(list) {
  domNodes.shoppingList.classList.add("scroll");
  let listMarkup;
  list.forEach((ing) => {
    listMarkup = ` <li class="shopping__item" id="${ing.id}">
                    <div class="shopping__count">
                        <input type="number" value="${ing.count}" step="${ing.count}" class="shopping__count-value">
                        <p>${ing.unit}</p>
                    </div>
                    <p class="shopping__description">${ing.textIng}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>`;
    domNodes.shoppingList.insertAdjacentHTML("beforeend", listMarkup);
  });
}

export function deleteListItemUI(id) {
  const deletedItem = document.querySelector(`#${id}`);
  deletedItem.remove();
}

export function clearScrollBar() {
  const shoppingList = Array.from(document.querySelectorAll(".shopping__item"));
  if (!shoppingList.length) {
    domNodes.shoppingList.classList.remove("scroll");
  }
}
