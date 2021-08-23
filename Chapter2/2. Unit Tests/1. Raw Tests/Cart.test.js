const Cart = require("./Cart");

const cart = new Cart();

cart.addToCart("Cupcake");

const hasOneItem = cart.items.length === 1;
const hasCupCake = cart.items[0] === "Cupcake";

if (hasOneItem && hasCupCake) {
	console.log("Test N1: The addToCart function can add an item to the cart");
} else {
	const actualContent = cart.items.join(", ");

	console.error("Test N1: The addToCart function didn't do what we expect!");
	console.error(`Test N1: Here is the actual content of the cart: ${actualContent}`);

	throw new Error("Test N1 failed!");
}
