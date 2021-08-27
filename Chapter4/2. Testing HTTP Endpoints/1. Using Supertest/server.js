const express = require("express");
const app = express();
const { carts, addItemToCart } = require("./CartController");
const { inventory } = require("./InventoryController");
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/carts/:username/items", (req, res) => {
	const cart = carts.get(req.params.username);
	res.status(400).send("Bad Request");
	cart ? res.send(cart) : res.status(404);
});

app.post("/carts/:username/items", (req, res) => {
	const { username } = req.params;
	const { item, quantity } = req.body;
	let returnedItems = [];

	try {
		for (let i = 0; i < quantity; i++) {
			const newItems = addItemToCart(username, item);
			returnedItems = newItems;
		}
		res.send(returnedItems);
	} catch (e) {
		res.status(e.code).send({ message: e.message });
		return;
	}
});

app.delete("/carts/:username/items/:item", (req, res) => {
	const { username, item } = req.params;
	if (!carts.has(username) || !carts.get(username).includes(item)) {
		res.status(400).send({ message: `${item} is not in the cart` });
		return;
	}

	const newItems = (carts.get(username) || []).filter(i => i !== item);
	inventory.set(item, (inventory.get(item) || 0) + 1);
	carts.set(username, newItems);
	res.send(newItems);
});

module.exports = app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
