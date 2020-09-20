import Search from "./models/Search.js";
import * as searchView from "./views/searchView.js";
import * as shopListView from "./views/shopListView.js";
import * as likesView from "./views/likesView.js";
import Likes from "./models/Likes.js";

export const DOMStrings = {
	searchInput: ".drink-search",
	searchBy: ".search-by",
	drinkList: ".drink-list",
	drinkItem: ".drink-item",
	drinkDesc: ".drink-desc",
	drinkShopList: ".drink-shop-list",
	likeDrink: ".like-drink",
	likedDrinkList: ".liked-drink-list",
	likedDrinkItem: ".liked-drink-item",
};

let state = {};

let path = window.location.pathname;

// code for main page
if (path === "/main") {
	// init for state
	window.addEventListener("load", () => {
		// new search object for loading drinks from liked list before searching
		state.search = new Search();
		// new likes
		state.likes = new Likes();
		// reading storage for saved likes
		state.likes.readStorage();
		// rendering saved likes
		state.likes.likes.forEach((like) => likesView.addToLikedList(like));
	});
	// event listener for liked drink clicked
	document.querySelector(DOMStrings.likedDrinkList).addEventListener("click", async (e) => {
		if (e.target.matches(".liked-drink-item, .liked-drink-item *")) {
			searchView.renderDrink(
				await state.search.getDrink(e.target.closest(DOMStrings.likedDrinkItem).dataset.id),
				state.likes.isLiked(e.target.closest(DOMStrings.likedDrinkItem).dataset.id)
			);
		}
	});
	// event listener for clicking in the shopping list section
	document.querySelector(DOMStrings.drinkShopList).addEventListener("click", (e) => {
		// removing single ingredient
		if (e.target.matches(".line .shop-list-ing")) {
			e.target.closest(".line").remove();
		}
		// removing entire drink
		else if (e.target.matches(".line .shop-list-name")) {
			e.target.closest(".shop-list-item").remove();
			shopListView.removeFromList(e.target.innerText);
		}
	});
	// event listener for clicking in the description section
	document.querySelector(DOMStrings.drinkDesc).addEventListener("click", (e) => {
		// adding to shopping list
		if (e.target.matches(".shop-add")) {
			shopListView.addToList();
		}
		// adding to liked drinks
		else if (e.target.matches(".like-drink, .like-drink *")) {
			if (likesView.addToLikes(e.target)) {
				state.likes.addToLikes(searchView.getCurrentDrink());
				likesView.addToLikedList(searchView.getCurrentDrink());
			}
			// removing from liked drinks
			else {
				state.likes.removeFromLikes(searchView.getCurrentDrink());
				likesView.removeFromLikedList(searchView.getCurrentDrink());
			}
		}
	});
	// event listener for clicking in search result section
	document.querySelector(DOMStrings.drinkList).addEventListener("click", async (e) => {
		e.preventDefault();
		// page scrolling buttons
		if (e.target.matches(".scroll-pre, .scroll-pre *")) {
			searchView.switchPage("pre");
		} else if (e.target.matches(".scroll-next, .scroll-next *")) {
			searchView.switchPage("next");
		}
		// drink clicked
		else if (e.target.matches(".drink-item, .drink-item *")) {
			searchView.renderDrink(
				await state.search.getDrink(e.target.closest(DOMStrings.drinkItem).dataset.id),
				state.likes.isLiked(e.target.closest(DOMStrings.drinkItem).dataset.id)
			);
		}
	});
	// event listener for Enter clicking in search bar
	document.querySelector(DOMStrings.searchInput).addEventListener("keypress", async (e) => {
		if (e.key.toLowerCase() === "enter") {
			// getting the search by value from ui
			let searchBy = document.querySelector(".search-by-selected").textContent;
			// new search with search input and search by values
			state.search = new Search(document.querySelector(DOMStrings.searchInput).value, searchBy);
			// requesting the search results
			await state.search.getResults();
			// rendering the results on the results section
			searchView.renderResults(state.search.resArray, document.querySelector(DOMStrings.drinkList));
		}
	});
	// event listeners for changing search by value
	$(DOMStrings.searchBy).click((e) => {
		Array.from(e.target.parentNode.children).forEach((button) => button.classList.remove("search-by-selected"));
		if (e.target === e.target.parentNode.children[0]) {
			e.target.parentNode.children[0].classList.add("search-by-selected");
		} else {
			e.target.parentNode.children[1].classList.add("search-by-selected");
		}
	});
}
