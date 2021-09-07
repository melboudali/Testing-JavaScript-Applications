const fs = require("fs");
const initialHtml = fs.readFileSync(`${__dirname}/index.html`);

const { updateItemList, handleAddItem, handleItemName, checkFormValues } = require("./domController");
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

describe("handleAddItem", () => {
	test("adding items to the page", () => {
		const event = {
			preventDefault: jest.fn(),
			target: {
				elements: {
					name: { value: "cupcake" },
					quantity: { value: "7" }
				}
			}
		};

		handleAddItem(event);

		expect(event.preventDefault.mock.calls).toHaveLength(1);

		const itemList = document.getElementById("item-list");
		expect(getByText(itemList, "cupcake - Quantity: 7")).toBeInTheDocument();
	});
});

describe("handleItemName", () => {
	test("adding empty item name", () => {
		const event = {
			preventDefault: jest.fn(),
			target: { value: "" }
		};

		handleItemName(event);
		const errorP = document.getElementById("error-msg");
		expect(errorP.innerHTML).toEqual("");
	});

	test("adding non existed item", () => {
		const event = {
			target: {
				value: "cupcake"
			}
		};

		handleItemName(event);
		const errorP = document.getElementById("error-msg");
		expect(errorP.innerHTML).toEqual("cupcake is not a valid item.");
	});

	test("adding empty item name", () => {
		const event = {
			target: { value: "cheesecake" }
		};

		handleItemName(event);
		const errorP = document.getElementById("error-msg");
		expect(errorP.innerHTML).toEqual("cheesecake is valid!");
	});
});

describe("checkFormValues", () => {
	test("entering valid item values", () => {
		document.querySelector(`input[name="name"]`).value = "cheesecake";
		document.querySelector(`input[name="quantity"]`).value = "1";
		checkFormValues();
		expect(screen.getByText("Add to inventory")).toBeEnabled();
	});

	test("entering invalid item names", () => {
		document.querySelector(`input[name="name"]`).value = "invalid";
		document.querySelector(`input[name="quantity"]`).value = "1";
		checkFormValues();
		expect(screen.getByText("Add to inventory")).toBeDisabled();

		document.querySelector(`input[name="name"]`).value = "cheesecake";
		document.querySelector(`input[name="quantity"]`).value = "";
		checkFormValues();
		expect(screen.getByText("Add to inventory")).toBeDisabled();
	});
});
