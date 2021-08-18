const Cart = require("./Cart");
const assert = require("assert");

const cart = new Cart();

cart.addToCart("Cupcake");

const hasOneItem = cart.items.length === 1;
const hasCupCake = cart.items[0] === "Cupcake";

// Test N1
if (hasOneItem && hasCupCake) {
	console.log("Test N1: The addToCart function can add an item to the cart");
} else {
	const actualContent = cart.items.join(", ");

	console.error("Test N1: The addToCart function didn't do what we expect!");
	console.error(`Test N1: Here is the actual content of the cart: ${actualContent}`);

	throw new Error("Test N1 failed!");
}

// Test N2 using assertions
cart.addToCart("Cheesecake");
assert.deepStrictEqual(cart.items, ["Cupcake", "Cheesecake"]);
console.log("Test N2: The addToCart function can add an item to the cart");

// Test N3
cart.addToCart("Pastry");
cart.addToCart("Croissant");
cart.removeFromCart("Cheesecake");

assert.deepStrictEqual(cart.items.length, 3);
assert.deepStrictEqual(cart.items, ["Cupcake", "Pastry", "Croissant"]);

console.log("Test N3: The removeCart function can remove an item from the cart");
