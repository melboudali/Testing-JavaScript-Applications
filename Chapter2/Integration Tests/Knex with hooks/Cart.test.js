const { db, closeConnection } = require("../../../dbConnection");
const { createCart, addItem } = require("./cart");

test("addItem adds an item to a cart", async () => {
	await db("carts").truncate();
	await db("carts_items").truncate();

	const username = "Moe EL BOUDALI";
	await createCart(username);

	const { id: cartId } = await db.select().from("carts").where({ username });
	await addItem(cartId, "cupcake");

	const result = await db.select("itemName").from("carts_items");

	expect(result).toEqual([{ cartId, itemName: "cupcake" }]);
	await closeConnection();
});
