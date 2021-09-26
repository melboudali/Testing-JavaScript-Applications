const { db } = require("../dbConnection");

const dbPlugin = (on, config) => {
	on("task", { emptyInventory: () => db("inventory").truncate() }, config);

	return config;
};

module.exports = dbPlugin;
