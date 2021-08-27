const { inventory } = require("./InventoryController");
const { carts, addItemToCart } = require("./CartController");

afterEach(() => {
	inventory.clear();
	carts.clear();
});

describe("addItemToCart", () => {
	test("adding unavailable items to cart", () => {
		carts.set("test_user", []);
		inventory.set("cheesecake", 0);

		try {
			addItemToCart("test_user", "cheesecake");
		} catch (e) {
			const expectedError = new Error(`cheesecake is unavailable`);
			expectedError.code = 400;

			expect(e).toEqual(expectedError);
		}

		expect(carts.get("test_user")).toEqual([]);
		expect.assertions(2);
	});
});
