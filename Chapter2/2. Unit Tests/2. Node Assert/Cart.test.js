const Cart = require("./Cart");
const assert = require("assert");

const cart = new Cart();

cart.addToCart("Cupcake");
assert.deepStrictEqual(cart.items, ["Cupcake"]);
console.log("Test N2: The addToCart function can add an item to the cart");

cart.addToCart("Pastry");
cart.addToCart("Croissant");
cart.removeFromCart("Cheesecake");

assert.deepStrictEqual(cart.items.length, 3);
assert.deepStrictEqual(cart.items, ["Cupcake", "Pastry", "Croissant"]);
console.log("Test N3: The removeCart function can remove an item from the cart");
