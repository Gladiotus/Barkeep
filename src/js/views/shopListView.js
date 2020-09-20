import { DOMStrings } from "../index.js";
import { getCurrentDrink } from "./searchView.js";

let shoppingList = [];

// adding drink to shopping list
export const addToList = () => {
	// getting the currently displayed drink
	const drink = getCurrentDrink();
	// finding if its already in the shopping list
	const index = shoppingList.findIndex((listDrink) => listDrink.id === drink.id);
	if (index === -1) {
		// if not, add it to the shopping list
		shoppingList.push(drink);
		let markup = `<div class='shop-list-item'>
        <span class='line'><h2 class="shop-list-name">${drink.name}</h2></span>
        <ul class="shop-list">
        `;
		drink.ingredients.forEach((ing) => {
			markup += `<span class='line'><li class="shop-list-ing">${ing.ingredient}</li></span>`;
		});
		markup += `</ul></div>`;
		document.querySelector(DOMStrings.drinkShopList).insertAdjacentHTML("beforeend", markup);
	}
};

export const removeFromList = (name) => {
	const index = shoppingList.findIndex((drink) => drink.name === name);
	shoppingList.splice(index, 1);
};
