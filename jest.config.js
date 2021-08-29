module.exports = {
	testEnvironment: "node",
	globalSetup: "<rootDir>/migrateDatabases.js",
	setupFilesAfterEnv: ["jest-extended", "<rootDir>/truncateTables.js", "<rootDir>/seedUser.js", "<rootDir>/disconnectFromDb.js"]
};
