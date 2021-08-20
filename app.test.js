const { app, resetState } = require("./app");
const fetch = require("isomorphic-fetch");

const apiRoot = "http://localhost:3000";

const addItem = (username, item) => {
	return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
		method: "POST"
	});
};

const getItems = username => {
	return fetch(`${apiRoot}/carts/${username}/items`, { method: "GET" });
};

const deleteItems = (username, item) => {
	return fetch(`${apiRoot}/carts/${username}/items/${item}`, { method: "DELETE" });
};

// End to End tests

test("adding items to a cart", async () => {
	const initialItems = await getItems("Moe EL BOUDALI");
	expect(initialItems.status).toBe(404);

	const addedItemRes = await addItem("Moe EL BOUDALI", "Cupcake");
	expect(await addedItemRes.json()).toEqual(["Cupcake"]);

	const finalItemsRes = await getItems("Moe EL BOUDALI");
	expect(await finalItemsRes.json()).toEqual(["Cupcake"]);
});

test("deleting items from the a cart", async () => {
	const response = await getItems("Moe EL BOUDALI");
	expect(response.status).toBe(404);

	await addItem("Moe EL BOUDALI", "Cupcake");
	await addItem("Moe EL BOUDALI", "Cheesecake");

	const fDeleteRes = await deleteItems("Moe EL BOUDALI", "Cupcake");

	expect(await fDeleteRes.json()).toEqual(["Cheesecake"]);

	const sDeleteRes = await deleteItems("Moe EL BOUDALI", "Cheesecake");

	expect(await sDeleteRes.json()).toEqual([]);
});

beforeEach(() => resetState()); //reset cart before each test
afterAll(() => app.close()); //to close the app after the test
