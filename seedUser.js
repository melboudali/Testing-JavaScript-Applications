const { db } = require("./dbConnection");
const { hashPassword } = require("./Chapter4/3. Dealing With External Dependencies/1. Database Integrations/AuthenticationController");

const username = "test_user";
const password = "a_password";
const passwordHash = hashPassword(password);
const email = "test_user@example.org";
const validAuth = Buffer.from(`${username}:${password}`).toString("base64");
const authHeader = `Basic ${validAuth}`;

global.user = {
	username,
	password,
	email,
	authHeader
};

beforeEach(async () => {
	const [id] = await db("users").insert({ username, email, passwordHash });
	global.user.id = id;
});
