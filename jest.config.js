module.exports = {
	// testEnvironment: "node",
	testEnvironment: "jsdom",
	globalSetup: "<rootDir>/migrateDatabases.js",
	setupFilesAfterEnv: [
		"<rootDir>/Chapter6/2. Asserting On The Dom/5. Writing Better Dom Assertions/setupJestDom.js",
		"jest-extended",
		"<rootDir>/truncateTables.js",
		"<rootDir>/seedUser.js",
		"<rootDir>/disconnectFromDb.js"
	]
};
