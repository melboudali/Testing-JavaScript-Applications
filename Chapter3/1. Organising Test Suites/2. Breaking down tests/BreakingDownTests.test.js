const { app, carts, inventory } = require("../../app");
const fetch = require("isomorphic-fetch");

const apiRoot = "http://localhost:3000";

const addItem = (username, item) => {
	return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
		method: "POST"
	});
};

describe("addItem", () => {
	test("adding items to the cart", async () => {
		const addItemRes = await addItem("Moe EL BOUDALI", "Cupcake");
		expect(addItemRes.status).toBe(404);
		inventory.set("Cupcake", 1);
		const addNewItemRes = await addItem("Moe EL BOUDALI", "Cupcake");
		expect(await addNewItemRes.json()).toEqual(["Cupcake"]);
		expect(inventory.get("Cupcake")).toBe(0);
		expect(carts.get("Moe EL BOUDALI")).toEqual(["Cupcake"]);
		const addItemAfterRes = await addItem("Moe EL BOUDALI", "Cupcake");
		expect(addItemAfterRes.status).toBe(404);
	});
});
afterAll(() => app.close());
