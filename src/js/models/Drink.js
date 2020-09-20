export default class Drink {
	constructor(id, name, img, instructions = "", ingredients = []) {
		this.id = id;
		this.name = name;
		this.img = img;
		this.instructions = instructions;
		this.ingredients = ingredients;
	}
}
