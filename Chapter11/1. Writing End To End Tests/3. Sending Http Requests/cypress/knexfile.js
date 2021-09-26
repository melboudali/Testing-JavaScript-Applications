module.exports = {
	development: {
		client: "sqlite3",
		// This filename depends on your SQLite database location
		connection: { filename: "../../../../dev.sqlite" },
		useNullAsDefault: true
	}
};
