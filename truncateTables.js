const { db } = require("./dbConnection");
const tablesToTruncate = ["users", "inventory", "carts_items"];

beforeEach(() => {
	return Promise.all(
		tablesToTruncate.map(t => {
			return db(t).truncate();
		})
	);
});
