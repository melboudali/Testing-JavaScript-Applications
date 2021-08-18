const { db, closeConnection } = require("../../../dbConnection");
const { createCart } = require("./cart");

test("createCart creates a cart for a username with async", async () => {
	await db("carts").truncate();
	await createCart("Moe EL BOUDALI");
	const result = await db.select("username").from("carts");
	expect(result).toEqual([{ username: "Moe EL BOUDALI" }]);
	// await closeConnection();
});

test("createCart creates a cart for a username with prosmises", done => {
	db("carts")
		.truncate()
		.then(() => createCart("Testing Javascript"))
		.then(() => db.select("username").from("carts"))
		.then(result => {
			expect(result).toEqual([{ username: "Testing Javascript" }]);
		})
		.then(closeConnection)
		.then(done);
});
