export default class Likes {
  constructor() {
    this.favRecipes = [];
  }
  addRecipeToFavorites(id, title, img_Url, publisher) {
    const recipe = {
      id: id,
      title: title,
      imgUrl: img_Url,
      author: publisher,
    };
    this.favRecipes.push(recipe);
    return recipe;
  }

  deleteRecipeFromFavorites(id) {
    if (id) {
      const recipeIndex = this.favRecipes.findIndex((el) => el.id === id);
      const deleteditemArr = this.favRecipes.splice(recipeIndex, 1);
    } else console.log("id is not correct");
  }

  isLiked(id) {
    return this.favRecipes.findIndex((elem) => elem.id === id) !== -1;
  }
}
