const request = require("supertest");
const app = require("./server");
const { users, hashPassword } = require("./AuthenticationController");

afterEach(() => users.clear());
afterEach(() => app.close());

describe("create accounts", () => {
	test("creating a new account", async () => {
		const response = await request(app)
			.put("/users/test_user")
			.send({ email: "test_user@example.org", password: "a_password" })
			.expect(200)
			.expect("Content-Type", /json/);

		expect(response.body).toEqual({
			message: "test_user created successfully."
		});

		expect(users.get("test_user")).toEqual({
			email: "test_user@example.org",
			passwordHash: hashPassword("a_password")
		});
	});

	test("username already exists", async () => {
		users.set("Moe", { email: "Moe@elboudali.com", passwordHash: hashPassword("newPassword") });
		const response = await request(app)
			.put("/users/Moe")
			.send({ email: "test_user@example.org", password: "a_password" })
			.expect(409)
			.expect("Content-Type", /json/);

		expect(response.body).toEqual({
			message: "Moe already exists."
		});
	});
});
