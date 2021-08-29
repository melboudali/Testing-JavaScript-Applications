const express = require("express");
const app = express();
const { db } = require("../../../dbConnection");
const fetch = require("isomorphic-fetch");

// const { users, hashPassword, authenticationMiddleware } = require("./AuthenticationController");

// const { carts, addItemToCart } = require("./CartController");
// const { inventory } = require("./InventoryController");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(async (req, res, next) => {
// 	if (req.originalUrl.startsWith("/carts")) {
// 		return await authenticationMiddleware({ req, res }, next);
// 	}
// 	next();
// });

// app.put("/users/:username", (req, res) => {
// 	const { username } = req.params;
// 	const { email, password } = req.body;
// 	const userAlreadyExists = users.has(username);
// 	if (userAlreadyExists) {
// 		return res.status(409).send({ message: `${username} already exists.` });
// 	}
// 	users.set(username, { email, passwordHash: hashPassword(password) });
// 	return res.send({ message: `${username} created successfully.` });
// });

// app.post("/carts/:username/items", (req, res) => {
// 	const { username } = req.params;
// 	const { item, quantity } = req.body;
// 	let returnedItems = [];

// 	try {
// 		for (let i = 0; i < quantity; i++) {
// 			const newItems = addItemToCart(username, item);
// 			returnedItems = newItems;
// 		}
// 		return res.send(returnedItems);
// 	} catch (e) {
// 		return res.status(e.code).send({ message: e.message });
// 	}
// });

// app.delete("/carts/:username/items/:item", (req, res) => {
// 	const { username, item } = req.params;
// 	if (!carts.has(username) || !carts.get(username).includes(item)) {
// 		return res.status(400).send({ message: `${item} is not in the cart` });
// 	}

// 	const newItems = (carts.get(username) || []).filter(i => i !== item);
// 	inventory.set(item, (inventory.get(item) || 0) + 1);
// 	carts.set(username, newItems);
// 	return res.send(newItems);
// });

app.get("/inventory/:itemName", async (req, res) => {
	const { itemName } = req.params;
	const response = await fetch(`http://recipepuppy.com/api?i=${itemName}`);
	const { title, href, results: recipes } = await response.json();
	const inventoryItem = await db.select().from("inventory").first();

	return res.send({
		...inventoryItem,
		info: `Data obtained from ${title} - ${href}`,
		recipes
	});
});

module.exports = app.listen(port);
