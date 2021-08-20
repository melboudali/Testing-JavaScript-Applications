const { inventory, addToInventory } = require("../AssertionChecks/InventoryController");

beforeEach(() => inventory.set("cheesecake", 0));

// a simpler and more readable alternative would be to check whether a function call throws an error.
// To perform this assertion, use Jest’s toThrow

// Because toThrow usually makes tests less verbose and easier to read, I tend to prefer it.
// I use it to validate both functions that should throw errors and functions that shouldn’t.

test("cancels operation for invalid quantities", () => {
	expect(() => addToInventory("cheesecake", "not a number")).not.toThrow();
	expect(inventory.get("cheesecake")).toBe(0);
	expect(Array.from(inventory.entries())).toHaveLength(1);
});
