const fs = require("fs");
const initialHtml = fs.readFileSync(`${__dirname}/index.html`);

const { updateItemList } = require("./domController");
const { screen, getByText } = require("@testing-library/dom");

beforeEach(() => {
	document.body.innerHTML = initialHtml;
});

describe("updateItemList", () => {
	test("updates the DOM with the inventory items", () => {
		const inventory = {
			cheesecake: 5,
			"apple pie": 2,
			"carrot cake": 6
		};
		updateItemList(inventory);

		const itemList = document.getElementById("item-list");
		expect(itemList.childNodes).toHaveLength(3);
		expect(getByText(itemList, "cheesecake - Quantity: 5", { selector: "li" })).toBeInTheDocument();
		expect(getByText(itemList, "apple pie - Quantity: 2")).toBeInTheDocument();
		expect(getByText(itemList, "carrot cake - Quantity: 6")).toBeInTheDocument();
	});

	test("updates the DOM with the inventory items", () => {
		// const inventory = {};

		updateItemList({});
		const itemList = document.getElementById("item-list");
		expect(itemList.childNodes).toHaveLength(0);

		const inventory = {
			cheesecake: 5,
			"apple pie": 2,
			"carrot cake": 6
		};
		updateItemList(inventory);

		expect(itemList.childNodes).toHaveLength(3);
		expect(getByText(itemList, "cheesecake - Quantity: 5", { selector: "li" })).toBeTruthy();
		expect(getByText(itemList, "apple pie - Quantity: 2")).toBeTruthy();
		expect(getByText(itemList, "carrot cake - Quantity: 6")).toBeTruthy();
	});

	test("adding a paragraph indicating what was the update", () => {
		const inventory = { cheesecake: 5, "apple pie": 2 };
		updateItemList(inventory);
		expect(screen.getByText(`The inventory has been updated - ${JSON.stringify(inventory)}`)).toBeTruthy();
	});

	test("highlighting in red elements whose quantity is below five", () => {
		const inventory = { cheesecake: 5, "apple pie": 2, "carrot cake": 6 };
		updateItemList(inventory);

		expect(screen.getByText("apple pie - Quantity: 2")).toHaveStyle({
			color: "red"
		});
	});
});
