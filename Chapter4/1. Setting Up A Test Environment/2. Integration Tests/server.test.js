const app = require("./server");
const { carts, addItemToCart } = require("./CartController");
const { inventory } = require("./InventoryController");
const fetch = require("isomorphic-fetch");

const apiRoot = "http://localhost:3000";
afterEach(() => app.close());
afterEach(() => inventory.clear());
describe("add items to the cart", () => {
	test("adding available items", async () => {
		inventory.set("cheesecake", 1);
		const response = await fetch(`${apiRoot}/carts/test_user/items/cheesecake`, { method: "POST" });

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(["cheesecake"]);
		expect(inventory.get("cheesecake")).toEqual(0);
	});
});

// describe("removing items from a cart", () => {
// 	test("removing existing items", async () => {
// 		carts.set("test_user", ["cheesecake"]);
// 		const response = await fetch(`${apiRoot}/carts/test_user/items/cheesecake`, { method: "DELETE" });
// 		expect(await response.json()).toEqual(["cheesecake"]);
// 	});
// });
