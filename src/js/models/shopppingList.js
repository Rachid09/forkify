import uniqid from "uniqid";
export default class Shoppinglist {
  constructor() {
    this.items = [];
  }

  addItems(count, unit, textIng) {
    const item = {
      id: uniqid(),
      unit,
      count,
      textIng,
    };
    this.items.push(item);
  }

  deleteItems(id) {
    if (id) {
      const itemIndex = this.items.findIndex((ing) => ing.id === id);
      const deleteditemArr = this.items.splice(itemIndex, 1);
    } else console.log("id is not correct");
  }

  updateIngredientCount(newCount, id) {
    this.items.find((elem) => {
      elem.id === id;
    }).count = newCount;
  }
}
