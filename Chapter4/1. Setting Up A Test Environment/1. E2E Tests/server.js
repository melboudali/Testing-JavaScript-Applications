const express = require("express");
const app = express();
const port = 3000;

let carts = new Map();
let inventory = new Map();

app.get("/carts/:username/items", (req, res) => {
	const cart = carts.get(req.params.username);
	res.status(400).send("Bad Request");
	cart ? res.send(cart) : res.status(404);
});

app.post("/carts/:username/items/:item", (req, res) => {
	const { username, item } = req.params;
	const isAvailable = inventory.has(item) && inventory.get(item) > 0;
	if (!isAvailable) {
		res.status(400).send({ message: `${item} is unavailable` });
		return;
	}

	const newItems = (carts.get(username) || []).concat(item);
	carts.set(username, newItems);
	inventory.set(item, inventory.get(item) - 1);
	res.send(newItems);
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

module.exports = {
	app: app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`);
	}),
	inventory
};
