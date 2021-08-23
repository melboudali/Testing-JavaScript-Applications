// 1
// To create different groups of tests within a file, you can nest them within a describe block.

describe("addItemToCart", () => {
	test("add an available item to cart", () => {
		// ...
	});

	test("add unavailable item to cart", () => {
		// ...
	});

	test("add multiple items to cart", () => {
		// ...
	});
});

describe("removeFromCart", () => {
	test("remove item from cart", () => {
		// ...
	});
});

// 2
// You can also use Jest’s describe blocks to keep helper functions within the scope of a single group of tests.
// If you had, for example, a utility function to add items to the inventory,
// instead of adding it to the file’s entire scope, you could place it within the describe block that needs it

// Nesting utility functions within describe blocks helps to indicate which tests need them.
// If insertInventoryItem is within the describe block for the addItemToCart function,
// you can be sure that it’s necessary only for that group of tests. When you organize tests this way,
// they become easier to understand and quicker to change because you know where to look for the functions and variables they use.

describe("addItemToCart", () => {
	const insertInventoryItem = () => {
		// Directly insert an item in the database's inventory table
	};

	// Tests...
	test("add an available item to cart", () => {
		// ...
	});
});

// 3
// These describe blocks also change the scope of hooks.
// Any beforeAll, afterAll, beforeEach, and afterEach hooks become relative to the describe block in which they’re located,
// if you want to apply a specific setup routine to a few tests in a file, but not to all of them,
// you can group those tests and write your beforeEach hook within the describe block for those tests as follows.

//  Jest will wait for the hook with insertInventoryItem to resolve before proceeding with the tests

// addItemToCart tests
describe("addItemToCart", () => {
	// utility func
	const insertInventoryItem = () => {
		/* */
	};

	let item;
	beforeEach(async () => {
		item = await insertInventoryItem();
	});

	// Tests...
	test("add an available item to cart", () => {
		// You can use `item` here
	});
});

// checkout tests
describe("checkout", () => {
	test("checkout non-existing cart", () => {
		// The previous `beforeEach` hook
		// does not run before this test
	});
});

// 4
// beforeEach hook runs before each test in the addItemToCart describe block
// beforeAll hook runs once before all tests in the checkout describe block

describe("addItemToCart", () => {
	const insertInventoryItem = () => {
		/* */
	};

	let item;
	beforeEach(async () => {
		item = await insertInventoryItem();
	});

	// Tests...
});

describe("checkout", () => {
	const mockPaymentService = () => {
		/* */
	};

	beforeAll(mockPaymentService);

	test("checkout non-existing cart", () => {
		/* */
	});
});

// 5
// By default, hooks that are outside of any describe blocks apply to the whole scope of a test file,

// beforeEach hook runs before each test in the file, no matter in which describe block the test is
// beforeEach hook runs before each test in the addItemToCart describe block
// beforeAll hook runs once before all tests in the checkout describe block
// afterAll hook runs once after all tests in the file finish

// Jest executes hooks from the outermost to the innermost block.
// In the previous example, the order of execution would be the following:
// 1. beforeEach ➝ clearDatabase
// 2. beforeEach ➝ insertInventoryItem
// 3. test ➝ add an available item to cart
// 4. beforeEach ➝ clearDatabase
// 5. beforeAll ➝ mockPaymentService
// 6. test ➝ checkout nonexisting cart
// 7. afterAll ➝ destroyDbConnection

beforeEach(clearDatabase);

describe("addItemToCart", () => {
	const insertInventoryItem = () => {
		/* */
	};

	let item;
	beforeEach(async () => {
		item = await insertInventoryItem();
	});

	test("add an available item to cart", () => {
		/* */
	});
});

describe("checkout", () => {
	const mockPaymentService = () => {
		/* */
	};

	beforeAll(mockPaymentService);

	test("checkout nonexisting cart", () => {
		/* */
	});
});

afterAll(destroyDbConnection);
