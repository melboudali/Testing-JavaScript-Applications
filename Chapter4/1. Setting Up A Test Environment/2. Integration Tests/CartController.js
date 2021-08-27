const { removeFromInventory } = require("./InventoryController");

const carts = new Map();

const addItemToCart = (username, item) => {
	removeFromInventory(item);
	const newItems = (carts.get(username) || []).concat(item);
	carts.set(username, newItems);
	return newItems;
};

module.exports = { addItemToCart, carts };
