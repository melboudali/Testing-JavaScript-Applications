const { inventory, getInventory } = require("./InventoryController");

test("generatedAt in the past", () => {
	const result = getInventory();

	const currentTime = new Date(Date.now() + 1);
	expect(result.generatedAt).toBeBefore(currentTime);
});
