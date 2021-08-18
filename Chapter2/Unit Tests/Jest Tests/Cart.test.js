const Cart = require("./Cart");

const cart = new Cart();

cart.addToCart("Cupcake");

test("Test N2: The addToCart function can add an item to the cart", () => {
	cart.addToCart("Cheesecake");
	expect(cart.items).toEqual(["Cupcake", "Cheesecake"]);
});

test("The removeCart function can remove an item from the cart", () => {
	cart.addToCart("Pastry");
	cart.addToCart("Croissant");
	cart.removeFromCart("Cheesecake");

	expect(cart.items.length).toEqual(3);
	expect(cart.items).toEqual(["Cupcake", "Pastry", "Croissant"]);
});
