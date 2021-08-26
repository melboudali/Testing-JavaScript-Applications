const logger = require("../../../logger");
const { inventory, addToInventory, getInventory } = require("./InventoryController");

// if we create __mock__ folder
jest.mock("../../../logger.js");

beforeEach(() => inventory.clear());

afterEach(() => jest.resetAllMocks());

describe("addToInventory", () => {
	beforeEach(() => {
		jest.spyOn(process, "memoryUsage").mockReturnValue({
			rss: 123456,
			heapTotal: 1,
			heapUsed: 2,
			external: 3
		});
	});
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
