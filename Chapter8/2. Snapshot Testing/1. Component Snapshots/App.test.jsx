import React from "react";
import App from "./App.jsx";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { API_ADDR } from "./constants.js";
import nock from "nock";
import { generateItemText } from "./ItemList.jsx";

jest.mock("react-spring");

beforeEach(() => {
	nock(API_ADDR).get("/inventory").reply(200, { cheesecake: 2, croissant: 5, macaroon: 96 });
});

afterEach(() => {
	if (!nock.isDone()) {
		nock.cleanAll();
		throw new Error("Not all mocked endpoints received requests.");
	}
});

test("rendering the server's list of items", async () => {
	const { findByText } = render(<App />);

	expect(await findByText(generateItemText("cheesecake", 2))).toBeInTheDocument();
	expect(await findByText(generateItemText("croissant", 5))).toBeInTheDocument();
	expect(await findByText(generateItemText("macaroon", 96))).toBeInTheDocument();

	const listElement = document.querySelector("ul");
	expect(listElement.childElementCount).toBe(3);
});

test("updating the list of items with new items", async () => {
	nock(API_ADDR)
		.post("/inventory/cheesecake", JSON.stringify({ quantity: 6 }))
		.reply(200);

	const { getByText, getByPlaceholderText } = render(<App />);

	await waitFor(() => {
		const listElement = document.querySelector("ul");
		expect(listElement.childElementCount).toBe(3);
	});

	fireEvent.change(getByPlaceholderText("Item name"), {
		target: { value: "cheesecake" }
	});
	fireEvent.change(getByPlaceholderText("Quantity"), {
		target: { value: "6" }
	});
	fireEvent.click(getByText("Add item"));

	await waitFor(() => {
		expect(getByText(generateItemText("cheesecake", 8))).toBeInTheDocument();
	});

	const listElement = document.querySelector("ul");
	expect(listElement.childElementCount).toBe(3);

	expect(getByText(generateItemText("croissant", 5))).toBeInTheDocument();
	expect(getByText(generateItemText("macaroon", 96))).toBeInTheDocument();
});

test("updating the action log when loading items", async () => {
	jest.spyOn(Date.prototype, "toISOString").mockReturnValue("2020-06-20T13:37:00.000Z");
	const { getByTestId } = render(<App />);

	await waitFor(() => {
		const listElement = document.querySelector("ul");
		expect(listElement.childElementCount).toBe(3);
	});

	const actionLog = getByTestId("action-log");
	expect(actionLog).toMatchSnapshot();
});
