import axios from "axios";

export default class Recipe {
  constructor(Id) {
    this.id = Id;
  }
  async getRecipeInfo() {
    try {
      const recipeInfo = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      const recipe = recipeInfo.data.recipe;
      this.title = recipe.title;
      this.ingredients = recipe.ingredients;
      this.img_Url = recipe.image_url;
      this.publisher = recipe.publisher;
      this.sourceUrl = recipe.source_url;
      return recipe;
    } catch (error) {
      alert(error);
    }
  }
  //calculate meal cooking time
  calcTime() {
    const numberingredients = this.ingredients.length;
    const periods = Math.ceil(numberingredients / 3);
    this.mealTime = 15 * periods;

    return this.mealTime;
  }
  //calculate th number of servings
  calcServings() {
    if (this.servings) {
      return this.servings;
    } else {
      this.servings = 4;
      return this.servings;
    }
    // return this.servings === false ? (this.servings = 4) : this.servings;
  }

  //parse ingredients and units into count
  parseIngredients() {
    const longUnits = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const shortUnits = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];

    const ingredients = this.ingredients.map((el) => {
      let ing = el.toLowerCase();
      longUnits.forEach((unit, index) => {
        if (ing.includes(unit)) {
          ing = ing.replace(unit, shortUnits[index]);
        }
      });

      ing = ing.replace(/ *\([^)]*\) */g, " ");

      const ingArr = ing.split(" ");

      const unitIndex = ingArr.findIndex((element) => {
        return shortUnits.includes(element);
      });
      let objIng;
      if (unitIndex > -1) {
        const ingredient = ingArr.slice(0, unitIndex);
        let count;
        if (ingredient.length === 1 && !!ingredient[0]) {
          //one element number
          count = eval(ingredient.join("").replace("-", "+"));
        } else {
          count = eval(ingredient.join("+"));
        }
        objIng = {
          count: count,
          unit: ingArr[unitIndex],
          text: ingArr.slice(unitIndex + 1).join(" "),
        };
        //there is a unit
      } else if (parseInt(ingArr[0])) {
        objIng = {
          count: parseInt(ingArr[0]),
          unit: "",
          text: ingArr.slice(1).join(" "),
        };
      } else if (unitIndex === -1 && !parseInt(ingArr[0])) {
        objIng = {
          count: 1,
          unit: "",
          text: ingArr.join(" "),
        };
      }

      return objIng;
    });
    this.ingredients = ingredients;
  }

  updateServingsIngredients(type) {
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

    this.ingredients.forEach((objIng) => {
      objIng.count = objIng.count * (newServings / this.servings);
    });
    this.servings = newServings;
    return this.ingredients;
  }
}
/*

image_url: 
ingredients
publisher_url: 
recipe_id: "47746"
social_rank: 100
source_url: 
title: 
*/
