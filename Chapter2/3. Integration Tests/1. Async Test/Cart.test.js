const { db, closeConnection } = require("../../../dbConnection");
const { createCart } = require("./cart");

test("createCart creates a cart for a username with async", async () => {
	await createCart("Moe EL BOUDALI");
	const result = await db.select("username").from("carts");
	expect(result).toEqual([{ username: "Moe EL BOUDALI" }]);
	await closeConnection();
});
