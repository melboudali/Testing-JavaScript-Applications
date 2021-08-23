const { inventory, addToInventory } = require("./inventoryController");

beforeEach(() => inventory.set("cheesecake", 0));

// To guarantee that your test will run assertions, you can use expect.hasAssertions,
// which will cause your test to fail if the test doesn’t run at least one assertion.

// you can use expect.assertions to explicitly determine how many assertions you expect to run.
// For example, if you want two assertions to run, use expect.assertions(2).
// Using expect.assertions will cause your tests to fail whenever the number of assertions executed doesn’t match what you determined

test("cancels operation for invalid quantities", () => {
	// expect.hasAssertions();  // will make sure that atleast one assertion is tested
	expect.assertions(2); // 2 assertions only
	try {
		addToInventory("cheesecake", "not a number");
	} catch (e) {
		expect(inventory.get("cheesecake")).toBe(0);
	}
	expect(Array.from(inventory.entries())).toHaveLength(1);
});
