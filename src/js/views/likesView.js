import { DOMStrings } from "../index.js";

const likedDrinkList = document.querySelector(".liked-drink-list");
export const addToLikes = (likeButton) => {
	// toggeling icon according to liked status
	likeButton.classList.toggle("far");
	likeButton.classList.toggle("fas");
	return likeButton.classList.contains("fas");
};

export const addToLikedList = (drink) => {
	// rendering the liked item in the liked list
	const markup = `
    <div class="liked-drink-item" data-id='${drink.id}'>
     	<img src="${drink.img}" alt="" />
    	<div class="liked-drink-name">${drink.name}</div>
    </div>`;
	likedDrinkList.insertAdjacentHTML("beforeend", markup);
};

// removing liked item from the liked list
export const removeFromLikedList = (drink) => {
	Array.from(likedDrinkList.children)
		.find((element) => element.dataset.id === drink.id)
		.remove();
};
