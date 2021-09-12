import React from "react";
import App from "./App.jsx";
import { render } from "@testing-library/react";

test("renders the appropriate header", () => {
	const { getByText } = render(<App />);
	expect(getByText("Inventory Contents")).toBeInTheDocument();
});
