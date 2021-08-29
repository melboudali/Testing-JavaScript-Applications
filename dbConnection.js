const environmentName = process.env.NODE_ENV;
const db = require("knex")(require("./knexfile")[environmentName]);

// we use NODE_ENV if development mode we will use development DB else jest will use test mode with test db
// to run migration on test db use: ./node_modules/.bin/knex migrate:latest --env test

const closeConnection = () => db.destroy();

module.exports = {
	db,
	closeConnection
};
