const express = require("express");
const app = express();
const { users, hashPassword } = require("./AuthenticationController");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.put("/users/:username", (req, res) => {
	const { username } = req.params;
	const { email, password } = req.body;
	const userAlreadyExists = users.has(username);
	if (userAlreadyExists) {
		return res.status(409).send({ message: `${username} already exists.` });
	}
	users.set(username, { email, passwordHash: hashPassword(password) });
	return res.send({ message: `${username} created successfully.` });
});

module.exports = app.listen(port);
