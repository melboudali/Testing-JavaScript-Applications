// In case you have tests that can run simultaneously within a test suite,
// you can use test.concurrent to indicate which ones Jest should execute concurrently, as follows.

describe("addItemToCart", () => {
	test.concurrent("add an available item to cart", async () => {
		/* */
	});
	test.concurrent("add unavailable item to cart", async () => {
		/* */
	});
	test.concurrent("add multiple items to cart", async () => {
		/* */
	});
});

// or npm run runTestsSequentially
// or npm test -- --runInBand
// or jest --runInBand

// To control how many tests run at a time,
// you can use the --maxConcurrencyOption and specify how many tests Jest can run simultaneously.
// To manage the number of worker threads spawned to run tests,
// you can use the --maxWorkers option and specify how many threads to spawn.
