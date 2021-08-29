const request = require("supertest");
const { db } = require("../../../dbConnection");

const app = require("./server");

jest.mock("isomorphic-fetch");

describe("fetch inventory items", () => {
	const eggs = { itemName: "eggs", quantity: 3 };
	const applePie = { itemName: "apple pie", quantity: 1 };

	beforeEach(async () => {
		await db("inventory").insert([eggs, applePie]);
		const { id: eggsId } = await db.select().from("inventory").where({ itemName: "eggs" }).first();
		eggs.id = eggsId;
	});

	test("can fetch an item from the inventory", async () => {
		const fakeApiResponse = {
			title: "FakeAPI",
			href: "example.org",
			results: [{ name: "Omelette du Fromage" }]
		};

		fetch.mockResolvedValue({
			json: jest.fn().mockResolvedValue(fakeApiResponse)
		});

		const response = await request(app).get(`/inventory/eggs`).expect(200).expect("Content-Type", /json/);

		expect(fetch.mock.calls).toHaveLength(1);
		expect(fetch.mock.calls[0]).toEqual([`http://recipepuppy.com/api?i=eggs`]);

		expect(response.body).toEqual({
			...eggs,
			info: `Data obtained from ${fakeApiResponse.title} - ${fakeApiResponse.href}`,
			recipes: fakeApiResponse.results
		});

		expect(response.body).toEqual(eggs);
	});
});
