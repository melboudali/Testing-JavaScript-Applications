const logger = require("../../../logger");
const { inventory, addToInventory, getInventory } = require("./InventoryController");

beforeAll(() => jest.spyOn(logger, "logInfo").mockImplementation(jest.fn()));
beforeAll(() => jest.spyOn(logger, "logError").mockImplementation(jest.fn()));
beforeEach(() => {
	inventory.clear();
	logger.logInfo.mockClear();
	logger.logError.mockClear();
	// before
	// jest.spyOn(process, "memoryUsage").mockImplementation(() => {
	// 	return { rss: 123456, heapTotal: 1, heapUsed: 2, external: 3 };
	// });
	// after mockReturnValue allows you to provide a canned response without having to create a function yourself
	jest.spyOn(process, "memoryUsage").mockReturnValue({
		rss: 123456,
		heapTotal: 1,
		heapUsed: 2,
		external: 3
	});
});

describe("addToInventory", () => {
	test("1. quantity not a number", () => {
		expect(() => addToInventory("Cheesecake", "2")).toThrow("quantiy must be a number");
	});

	test("quantity not a number", () => {
		try {
			addToInventory("cheesecake", "not a number");
		} catch (error) {}

		expect(logger.logError.mock.calls).toHaveLength(1);

		const errorRes = logger.logError.mock.calls[0];
		const [firstArg, secondArg] = errorRes;
		expect(firstArg).toEqual({ quantity: "not a number" });
		expect(secondArg).toBe("could not add item to inventory because quantity was not a number");
	});

	test("logging new items", () => {
		addToInventory("Cheesecake", 2);
		expect(logger.logInfo.mock.calls).toHaveLength(1);
		const firstCallArgs = logger.logInfo.mock.calls[0];
		const [firstArg, secondArg] = firstCallArgs;
		expect(firstArg).toEqual({ item: "Cheesecake", quantity: 2, memoryUsage: 123456 });
		expect(secondArg).toEqual("item added to the inventory");
	});
});

describe("getInventory", () => {
	test("logging fetches", () => {
		inventory.set("Cupcake", 4);
		getInventory();
		expect(logger.logInfo.mock.calls).toHaveLength(1);
		const firstCallArgs = logger.logInfo.mock.calls[0];

		const [firstArg, secondArg] = firstCallArgs;
		expect(firstArg).toEqual({ contents: { Cupcake: 4 } });
		expect(secondArg).toEqual("inventory items fetched");
	});
});
