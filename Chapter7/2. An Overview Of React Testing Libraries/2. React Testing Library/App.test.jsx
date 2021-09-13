import React from "react";
import App from "./App.jsx";
import { render } from "@testing-library/react";
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

test("renders the appropriate header", () => {
	const { getByText } = render(<App />);
	expect(getByText("Inventory Contents")).toBeInTheDocument();
});
