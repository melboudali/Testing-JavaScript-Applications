const { db, closeConnection } = require("../../../dbConnection");
const { createCart, addItem } = require("./cart");

afterAll(async () => await closeConnection());
test("addItem adds an item to a cart", async () => {
	const username = "Moe EL BOUDALI";
	await createCart(username);

	const { id: cartId } = await db.select().from("carts").where({ username });
	await addItem(cartId, "cupcake");

	const result = await db.select("itemName").from("carts_items_one");

	expect(result).toEqual([{ cartId, itemName: "cupcake" }]);
	await closeConnection();
});
