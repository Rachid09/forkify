import axios from "axios";
import { spinnerLoading, domNodes, spinnerHidden } from "../view/base";
// import domNodes from "../view/base";
// import { domNodes } from "../view/base";

//  b4e87f10e4654bed8e90790ce82eaada
// https://forkify-api.herokuapp.com/api/search
//api.spoonacular.com/recipes/search?apiKey=${key}&

export default class Search {
  constructor(query) {
    this.query = query;
    // this.getSearchResults = getResultsHnadler;
  }
  async getSearchResults() {
    // const key = "538d6bf0ba2643dfbaa64b07bc9927fa";
    //   const cors = "https://cors-anywhere.herokuapp.com/";
    //   const proxy = "https://crossorigin.me/";

    try {
      const fetchedResults = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );

      this.recipes = fetchedResults.data.recipes;

      return this.recipes;
    } catch (error) {
      alert(error);
      alert("something wrong with the search...");
    }
  }
}
