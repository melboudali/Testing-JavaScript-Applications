const { addItemToCart, monitorStaleItems } = require("./cartController");
const FakeTimers = require("@sinonjs/fake-timers");

describe("timers", () => {
	const waitMs = ms => {
		return new Promise(resolve => setTimeout(resolve, ms));
	};
	const hoursInMs = n => 1000 * 60 * 60 * n;

	let clock;
	beforeEach(() => {
		clock = FakeTimers.install({
			toFake: ["Date", "setInterval"]
		});
	});

	let timer;
	afterEach(() => {
		clock = clock.uninstall();
	});

	test("removing stale items", async () => {
		await db("inventory").insert({
			itemName: "cheesecake",
			quantity: 1
		});

		await addItemToCart(globalUser.username, "cheesecake");

		clock.tick(hoursInMs(4));

		timer = monitorStaleItems();

		clock.tick(hoursInMs(2));

		await withRetries(async () => {
			const finalCartContent = await db
				.select()
				.from("carts_items")
				.join("users", "users.id", "carts_items.userId")
				.where("users.username", globalUser.username);

			expect(finalCartContent).toEqual([]);
		});

		await withRetries(async () => {
			const inventoryContent = await db.select("itemName", "quantity").from("inventory");

			expect(inventoryContent).toEqual([{ itemName: "cheesecake", quantity: 1 }]);
		});
	});

	const withRetries = async fn => {
		const JestAssertionError = (() => {
			try {
				expect(false).toBe(true);
			} catch (e) {
				return e.constructor;
			}
		})();

		try {
			await fn();
		} catch (e) {
			if (e.constructor === JestAssertionError) {
				await new Promise(resolve => {
					return setTimeout(resolve, 100);
				});

				await withRetries(fn);
			} else {
				throw e;
			}
		}
	};
});
