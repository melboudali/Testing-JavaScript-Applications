const Cart = require("./Cart");

const cart = new Cart();

cart.addToCart("Cupcake");

const hasOneItem = cart.items.length === 1;
const hasCupCake = cart.items[0] === "Cupcake";

if (hasOneItem && hasCupCake) {
	console.log("The addToCart function can add an item to the cart");
} else {
	const actualContent = cart.items.join(", ");

	console.error("The addToCart function didn't do what we expect!");
	console.error(`Here is the actual content of the cart: ${actualContent}`);

	throw new Error("Test failed!");
}
