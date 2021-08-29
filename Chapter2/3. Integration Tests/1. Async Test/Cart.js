const { db } = require("../../../dbConnection");

const createCart = username => {
	return db("carts").insert({ username });
};

const addItem = (cartId, itemName) => {
	return db("carts_items_one").insert({ cartId, itemName });
};

module.exports = {
	createCart,
	addItem
};
