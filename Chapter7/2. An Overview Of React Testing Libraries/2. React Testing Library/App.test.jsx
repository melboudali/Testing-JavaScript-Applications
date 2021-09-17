import React from "react";
import App from "./App.jsx";
import { render, waitFor } from "@testing-library/react";
import { API_ADDR } from "./constants.js";
import nock from "nock";

beforeEach(() => {
	nock(API_ADDR).get("/inventory").reply(200, { cheesecake: 2, croissant: 5, macaroon: 96 });
});

afterEach(() => {
	if (!nock.isDone()) {
		nock.cleanAll();
		throw new Error("Not all mocked endpoints received requests.");
	}
});

// test("renders the appropriate header", () => {
// 	const { getByText } = render(<App />);
// 	expect(getByText("Inventory Contents")).toBeInTheDocument();
// });

// test("rendering the server's list of items", async () => {
// 	const { getByText } = render(<App />);

// 	await waitFor(() => {
// 		const listElement = document.querySelector("ul");
// 		expect(listElement.childElementCount).toBe(3);
// 	});

// 	expect(getByText("cheesecake - Quantity: 2")).toBeInTheDocument();
// 	expect(getByText("croissant - Quantity: 5")).toBeInTheDocument();
// 	expect(getByText("macaroon - Quantity: 96")).toBeInTheDocument();
// });

// To avoid having to use waitFor every time you need to wait for an element, you can also use findBy* instead of getBy* queries.
// A findBy* query runs asynchronously. The promise returned by this kind of query either resolves with the found element or rejects after one second if it didn’t find anything matching the passed criteria.
// You could use it, for example, to replace the waitFor, which causes your test to wait for the list to have three children.

test("rendering the server's list of items", async () => {
	const { findByText } = render(<App />);

	expect(await findByText("cheesecake - Quantity: 2")).toBeInTheDocument();
	expect(await findByText("croissant - Quantity: 5")).toBeInTheDocument();
	expect(await findByText("macaroon - Quantity: 96")).toBeInTheDocument();

	const listElement = document.querySelector("ul");
	expect(listElement.childElementCount).toBe(3);
});
