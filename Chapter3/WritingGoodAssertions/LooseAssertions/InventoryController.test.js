const { inventory, addToInventory } = require("./inventoryController");

beforeEach(() => inventory.clear());

test("returned value", () => {
	const result = addToInventory("cheesecake", 2);
	expect(typeof result).toBe("number");
});

// One way of making this assertion accept fewer values—make it “tighter”—is to expect the result to be bigger than a particular value
test("returned value greater than 1", () => {
	const result = addToInventory("cheesecake", 2);
	expect(result).toBeGreaterThan(1);
});

// The tighter and most valuable assertion you can write is an assertion that allows only a single result to pass
test("returned value equal 2", () => {
	const result = addToInventory("cheesecake", 2);
	expect(result).toBe(2);
});

// Ideally, your assertions should accept a single result.
// If your assertions customarily allow many results,
// it can be a sign that your code is not deterministic or that you don’t know it well enough.
// Loose assertions make it easier for tests to pass,
// but they make those tests less valuable because they might not fail when the application produces invalid output.
// Writing tighter assertions makes it harder for your tests to pass when the application code has problems,
// making it easier to catch bugs.
