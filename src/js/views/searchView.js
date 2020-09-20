import { DOMStrings } from "../index.js";

let state = {};

// getting the results from the model and saving them to state
export const renderResults = (result, drinkList) => {
	state = {
		result: result,
		page: 1,
		drinkList: drinkList,
	};
	// render current search result page
	renderPage();
};

const renderPage = () => {
	state.drinkList.innerHTML = "";
	// render 9 drinks from search results according to current page
	for (let i = (state.page - 1) * 9; i < Math.min(state.page * 9, state.result.length); i++) {
		let markup = `
		<div class="drink-item" data-id=${state.result[i].id}>
			<img class="drink-img" src="${state.result[i].img}" />
			<h3 class="drink-name">${state.result[i].name}</h3>
		</div>`;
		state.drinkList.insertAdjacentHTML("beforeend", markup);
	}
	// rendering pagination buttons
	let buttonMarkup = `
	<a href="" class="scroll-btn scroll-pre"><i class="fa fa-arrow-left fa-2x"></i></a>
	<h3 class="result-page">${state.page} / ${Math.ceil(state.result.length / 9)}</h3>
	<a href="" class="scroll-btn scroll-next"><i class="fa fa-arrow-right fa-2x"></i></a>`;
	state.drinkList.insertAdjacentHTML("beforeend", buttonMarkup);
};

// switching pages
export const switchPage = (type) => {
	if (type === "next" && state.page + 1 <= Math.ceil(state.result.length / 9)) state.page += 1;
	else if (type === "pre" && state.page > 1) state.page -= 1;
	renderPage();
};

// rendering clicked drink
export const renderDrink = (drink, isLiked) => {
	let drinkDesc = document.querySelector(DOMStrings.drinkDesc);
	drinkDesc.innerHTML = "";
	let markup = `
		<div class="main-header grid-row">
			<span class='like-drink'><i class="fa${isLiked ? "s" : "r"} fa-heart fa-2x"></i></span>
			<img src="${drink.img}" alt="" class="main-image" />
			<h1 class="main-name">${drink.name}</h1>
			<hr class='top-line'>
			<hr class='bottom-line'>
		</div>
		<div class="main-content grid-row">
		<h1 class='recipe-header'>Ingredients</h1>	
		<ul class="main-ing-list">`;
	drink.ingredients.forEach((ing) => {
		markup += `<li class="main-ing">${ing.measure || ""} ${ing.ingredient}</li>`;
	});
	markup += `</ul>
	<h1 class='recipe-header'>Instructions</h1>	
			<p class="instructions">
				${drink.instructions}
			</p>
		</div>
		<button class="starter shop-add">Add To Shopping List</button>`;
	state.currentDrink = drink;
	drinkDesc.insertAdjacentHTML("beforeend", markup);
};

export const getCurrentDrink = () => {
	return state.currentDrink;
};
