const crypto = require("crypto");
const { mockRequest } = require("mock-req-res");
const { users, hashPassword, credentialsAreValid, authenticationMiddleware } = require("./AuthenticationController");

afterEach(() => users.clear());

describe("hashPassword", () => {
	test("hashing passwords", () => {
		const plainTextPassword = "password_example";
		const hash = crypto.createHash("sha256");

		hash.update(plainTextPassword);
		const expectedHash = hash.digest("hex");
		const actualHash = hashPassword(plainTextPassword);
		expect(actualHash).toBe(expectedHash);
	});
});

describe("credentialsAreValid", () => {
	test("validating credentials", () => {
		users.set("test_user", {
			email: "test_user@example.org",
			passwordHash: hashPassword("a_password")
		});

		const hasValidCredentials = credentialsAreValid("test_user", "a_password");
		expect(hasValidCredentials).toBe(true);

		const hasInValidCredentials = credentialsAreValid("test_user", "password");
		expect(hasInValidCredentials).toBe(false);
	});
});

describe("authenticationMiddleware", () => {
	test("returning an error if the credentials are not valid", async () => {
		const fakeAuth = Buffer.from("invalid:credentials").toString("base64");
		const req = mockRequest({ headers: { authorization: `Basic ${fakeAuth}` } });
		const res = {};
		const next = jest.fn();
		const ctx = { res, req };

		await authenticationMiddleware(ctx, next);

		expect(next.mock.calls).toHaveLength(0);

		expect(ctx).toEqual({
			...ctx,
			res: { ...res, status: 401, body: { message: "please provide valid credentials" } }
		});
	});

	test("if the credentials are valid", async () => {
		users.set("test_user", {
			email: "test_user@example.org",
			passwordHash: hashPassword("a_password")
		});

		const validAuth = Buffer.from("test_user:a_password").toString("base64");

		const req = mockRequest({ headers: { authorization: `Basic ${validAuth}` } });

		const res = {};
		const next = jest.fn();
		const ctx = { res, req };

		await authenticationMiddleware(ctx, next);

		expect(next.mock.calls).toHaveLength(1);
	});
});
