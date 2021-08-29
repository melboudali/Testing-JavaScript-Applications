const request = require("supertest");
const { db } = require("../../../dbConnection");

const app = require("./server");

describe("fetch inventory items", () => {
	const eggs = { itemName: "eggs", quantity: 3 };
	const applePie = { itemName: "apple pie", quantity: 1 };

	beforeEach(async () => {
		await db("inventory").insert([eggs, applePie]);
		const { id: eggsId } = await db.select().from("inventory").where({ itemName: "eggs" }).first();
		eggs.id = eggsId;
	});

	test("can fetch an item from the inventory", async () => {
		const thirdPartyResponse = await fetch("http://recipepuppy.com/api?i=eggs");
		const { title, href, results: recipes } = await thirdPartyResponse.json();

		const response = await request(app).get(`/inventory/eggs`).expect(200).expect("Content-Type", /json/);

		expect(response.body).toEqual({
			...eggs,
			info: `Data obtained from ${title} - ${href}`,
			recipes
		});

		expect(response.body).toEqual(eggs);
	});
});
