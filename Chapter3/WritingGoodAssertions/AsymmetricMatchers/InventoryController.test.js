const { inventory, getInventory } = require("./inventoryController");

// When testing this function, your date will change whenever the test runs.
// To avoid asserting on the exact time the inventory report was generated,
// you can use an asymmetric matcher to ensure that the generatedAt field will contain a date.
// For the other properties, you can have tight assertions,
test("inventory contents", () => {
	inventory.set("cheesecake", 1).set("macarroon", 3).set("croissant", 3).set("eclaire", 7);
	const result = getInventory();

	expect(result).toEqual({
		cheesecake: 1,
		macarroon: 3,
		croissant: 3,
		eclaire: 7,
		generatedAt: expect.any(Date)
	});
});
