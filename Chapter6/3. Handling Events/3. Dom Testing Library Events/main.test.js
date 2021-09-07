const fs = require("fs");
const initialHtml = fs.readFileSync(`${__dirname}/index.html`);
const { screen, getByText, fireEvent } = require("@testing-library/dom");

beforeEach(() => {
	document.body.innerHTML = initialHtml;

	jest.resetModules();
	require("./main");
});

test("adding items through the form", () => {
	screen.getByPlaceholderText("Item name").value = "cupcake";
	screen.getByPlaceholderText("Quantity").value = "7";

	const event = new Event("submit");
	const form = document.getElementById("add-item-form");
	form.dispatchEvent(event);

	const itemList = document.getElementById("item-list");
	expect(getByText(itemList, "cupcake - Quantity: 7")).toBeInTheDocument();
});

describe("item name validation", () => {
	test("entering valid item names ", () => {
		const itemField = screen.getByPlaceholderText("Item name");
		fireEvent.input(itemField, {
			target: { value: "cheesecake" },
			bubbles: true
		});

		expect(screen.getByText("cheesecake is valid!")).toBeInTheDocument();
	});

	test("entering invalid item names ", () => {
		const itemField = screen.getByPlaceholderText("Item name");
		fireEvent.input(itemField, { target: { value: "book" }, bubbles: true });

		expect(screen.getByText("book is not a valid item.")).toBeInTheDocument();
	});
});
