import React from "react";
import ItemList, { generateItemText } from "./ItemList.jsx";
import { render } from "@testing-library/react";

describe("ItemList Component", () => {
	test("check items list", () => {
		const Items = { cheesecake: 2, croissant: 5, macaroon: 96 };
		const { getByText } = render(<ItemList items={Items} />);

		const listElement = document.querySelector("ul");
		expect(listElement.childElementCount).toBe(3);
		expect(getByText(generateItemText("cheesecake", 2))).toBeInTheDocument();
		expect(getByText(generateItemText("croissant", 5))).toBeInTheDocument();
		expect(getByText(generateItemText("macaroon", 96))).toBeInTheDocument();
	});

	test("highlighting items that are almost out of stock", () => {
		const Items = { cheesecake: 2, croissant: 5, macaroon: 96 };

		const { getByText } = render(<ItemList items={Items} />);
		const cheesecakeItem = getByText(generateItemText("cheesecake", 2));
		expect(cheesecakeItem).toHaveStyle({ color: "red" });
	});

	test("highlighting items that are almost out of stock with snapshot", () => {
		const Items = { cheesecake: 2, croissant: 5, macaroon: 96 };

		const { getByText } = render(<ItemList items={Items} />);
		const cheesecakeItem = getByText(generateItemText("cheesecake", 2));
		const macaroon = getByText(generateItemText("macaroon", 96));
		expect(cheesecakeItem).toMatchSnapshot();
		expect(macaroon).toMatchSnapshot();
	});
});

describe("generateItemText", () => {
	test("generating an item's text", () => {
		expect(generateItemText("cheesecake", 3)).toBe("cheesecake - Quantity: 3");
		expect(generateItemText("apple pie", 22)).toBe("apple pie - Quantity: 22");
	});
});
