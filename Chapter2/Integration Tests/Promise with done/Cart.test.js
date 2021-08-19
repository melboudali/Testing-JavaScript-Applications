const { db, closeConnection } = require("../../../dbConnection");
const { createCart } = require("./cart");

test("createCart creates a cart for a username with done", done => {
	db("carts")
		.truncate()
		.then(() => createCart("Moe EL BOUDALI"))
		.then(() => db.select("username").from("carts"))
		.then(result => {
			expect(result).toEqual([{ username: "Moe EL BOUDALI" }]);
		})
		.then(closeConnection)
		.then(done);
});

// NB: Be careful when adding the done parameter to your test functions. If you forget to call it, your tests will fail due to a timeout.
// Calling done with a truthy argument will also cause your test to fail.
// Even if you return a promise from a test that takes done as an argument, your test will terminate only when done is invoked.
