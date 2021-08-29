const environmentName = process.env.NODE_ENV || "test";
const environmentConfig = require("./knexfile")[environmentName];
const db = require("knex")(environmentConfig);

module.exports = async () => {
	await db.migrate.latest();

	await db.destroy();
};
