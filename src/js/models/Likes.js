export default class Likes {
	constructor() {
		this.likes = [];
	}

	// new like
	addToLikes(drink) {
		this.likes.push(drink);
		this.persistData();
	}

	// remove like
	removeFromLikes(drink) {
		const index = this.likes.findIndex((likedDrink) => likedDrink.id === drink.id);
		this.likes.splice(index, 1);
		this.persistData();
	}

	// return currently liked drinks
	getLikedDrinks() {
		return this.likes;
	}

	// return if this id belongs to a liked drink
	isLiked(id) {
		return this.likes.find((likedDrink) => likedDrink.id === id);
	}

	// save data in the local storage
	persistData() {
		localStorage.setItem("likes", JSON.stringify(this.likes));
	}

	// read storage to see if there is saved data on liked drinks
	readStorage() {
		const storage = JSON.parse(localStorage.getItem("likes"));

		// Restoring likes from the localStorage
		if (storage) this.likes = storage;
	}
}
