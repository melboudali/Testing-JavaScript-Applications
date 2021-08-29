const nock = require("nock");
const request = require("supertest");
const { db } = require("../../../dbConnection");
const app = require("./server");

beforeEach(() => nock.cleanAll());

describe("fetch inventory items", () => {
	const eggs = { itemName: "eggs", quantity: 3 };
	const applePie = { itemName: "apple pie", quantity: 1 };

	beforeEach(async () => {
		await db("inventory").insert([eggs, applePie]);
		const { id: eggsId } = await db.select().from("inventory").where({ itemName: "eggs" }).first();
		eggs.id = eggsId;
	});

	beforeEach(() => {
		nock.cleanAll();
	});

	afterEach(() => {
		if (!nock.isDone()) {
			throw new Error("Not all mocked endpoints received requests.");
		}
	});

	test("can fetch an item from the inventory", async () => {
		const eggsResponse = {
			title: "FakeAPI",
			href: "example.org",
			results: [{ name: "Omelette du Fromage" }]
		};

		nock("http://recipepuppy.com").get("/api").query({ i: "eggs" }).reply(200, eggsResponse);

		const response = await request(app).get(`/inventory/eggs`).expect(200).expect("Content-Type", /json/);

		expect(response.body).toEqual({
			...eggs,
			info: `Data obtained from ${eggsResponse.title} - ${eggsResponse.href}`,
			recipes: eggsResponse.results
		});
	});
});
