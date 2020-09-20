import axios from "axios";
import Drink from "./Drink";

// Queries
//Search By Ingredient https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
//Search by name https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
//Search by ID https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
//Search Ingredient img https://www.thecocktaildb.com/images/ingredients/Yellow Chartreuse-Small.png

// Search Class
export default class Search {
	// each search object has a query and a searchBy attribute
	constructor(query = "", searchBy = "") {
		this.searchBy = searchBy;
		// if you search by name
		if (searchBy === "Name") this.query = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
		// if you search by ingredient
		else if (searchBy === "Ingredient")
			this.query = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`;
	}
	// get the results from the api for the search results
	async getResults() {
		try {
			let res = await axios(this.query);
			this.rawResult = res.data.drinks;
			// process results into custom Drink objects
			this.resArray = this.rawResult.map((drink) => {
				return new Drink(drink.idDrink, drink.strDrink, drink.strDrinkThumb);
			});
		} catch (error) {
			console.log(error);
		}
	}
	// get clicked drink extensive information
	async getDrink(id) {
		try {
			let query = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
			let res = await axios(query);

			// return Drink
			return new Drink(
				id,
				res.data.drinks[0].strDrink,
				res.data.drinks[0].strDrinkThumb,
				res.data.drinks[0].strInstructions,
				processDrinkIng(res)
			);
		} catch (error) {
			console.log(error);
		}
	}
}

// process drink ingredients to add measure to ingredient name
const processDrinkIng = (res) => {
	let ingArray = [];
	for (let i = 1; i <= 15; i++) {
		if (res.data.drinks[0][`strIngredient${i}`]) {
			ingArray.push({
				ingredient: res.data.drinks[0][`strIngredient${i}`],
				measure: res.data.drinks[0][`strMeasure${i}`],
			});
		} else break;
	}
	return ingArray;
};
