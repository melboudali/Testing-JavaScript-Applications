module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/setupJestDom.js", "<rootDir>/setupGlobalFetch.js"]
};
