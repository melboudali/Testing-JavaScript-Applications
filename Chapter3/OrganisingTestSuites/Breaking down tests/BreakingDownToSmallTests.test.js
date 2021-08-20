const { app, carts, inventory } = require("../../app");
const fetch = require("isomorphic-fetch");

const apiRoot = "http://localhost:3000";

const addItem = (username, item) => {
	return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
		method: "POST"
	});
};

describe("addItem", () => {
	beforeEach(() => carts.clear());
	beforeEach(() => inventory.set("Cupcake", 1));

	test("correct response", async () => {
		const addNewItemRes = await addItem("Moe EL BOUDALI", "Cupcake");
		expect(addNewItemRes.status).toBe(200);
		expect(await addNewItemRes.json()).toEqual(["Cupcake"]);
	});
	test("inventory update", async () => {
		await addItem("Moe EL BOUDALI", "Cupcake");
		expect(inventory.get("Cupcake")).toBe(0);
	});
	test("cart update", async () => {
		await addItem("Joe", "Cupcake");
		expect(carts.get("Joe")).toEqual(["Cupcake"]);
	});
	test("soldout items", async () => {
		inventory.set("Cupcake", 0);
		const addItemRes = await addItem("Doe", "Cupcake");
		expect(addItemRes.status).toBe(404);
	});
});
afterAll(() => app.close());
