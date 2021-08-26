const { app, inventory } = require("./server");
const fetch = require("isomorphic-fetch");

const apiRoot = "http://localhost:3000";

afterEach(() => app.close());
afterEach(() => inventory.clear());

describe("add items to a cart", () => {
	test("adding available items", async () => {
		inventory.set("cheesecake", 1);
		const response = await fetch(`${apiRoot}/carts/test_user/items/cheesecake`, { method: "POST" });

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(["cheesecake"]);
		expect(inventory.get("cheesecake")).toEqual(0);
	});
});
