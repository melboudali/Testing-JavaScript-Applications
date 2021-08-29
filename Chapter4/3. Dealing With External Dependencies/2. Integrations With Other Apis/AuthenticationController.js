const crypto = require("crypto");
const { db } = require("../../../dbConnection");

const hashPassword = password => {
	const hash = crypto.createHash("sha256");
	hash.update(password);
	return hash.digest("hex");
};

const credentialsAreValid = async (username, password) => {
	const user = await db("users").select().where({ username }).first();

	if (!user) return false;
	return user.passwordHash === hashPassword(password);
};

const authenticationMiddleware = async ({ req, res }, next) => {
	try {
		const authHeader = req.headers.authorization;
		const credentials = Buffer.from(authHeader.slice("basic".length + 1), "base64").toString();
		const [username, password] = credentials.split(":");

		if (!(await credentialsAreValid(username, password))) {
			throw new Error("invalid credentials");
		}
	} catch (e) {
		if (Object.keys(res).length === 0) {
			res.status = 401;
			res.body = { message: `please provide valid credentials` };
			return;
		}
		return res.status(401).send({ message: `please provide valid credentials` });
	}

	await next();
};

module.exports = { hashPassword, credentialsAreValid, authenticationMiddleware };
