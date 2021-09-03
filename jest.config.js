module.exports = {
	// testEnvironment: "node",
	testEnvironment: "jsdom",
	globalSetup: "<rootDir>/migrateDatabases.js",
	setupFilesAfterEnv: ["jest-extended", "<rootDir>/truncateTables.js", "<rootDir>/seedUser.js", "<rootDir>/disconnectFromDb.js"]
};
