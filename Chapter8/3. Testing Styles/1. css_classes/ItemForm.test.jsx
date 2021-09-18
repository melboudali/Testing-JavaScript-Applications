import React from "react";
import ItemForm from "./ItemForm";
import nock from "nock";
import { render, fireEvent } from "@testing-library/react";
import { API_ADDR } from "./constants";

test("Form's Elements", () => {
	const { getByText, getByPlaceholderText } = render(<ItemForm />);
	expect(getByText("Add item")).toBeInTheDocument();
	expect(getByPlaceholderText("Item name")).toBeInTheDocument();
	expect(getByPlaceholderText("Quantity")).toBeInTheDocument();
});

test("sending requests", () => {
	const onItemAdded = jest.fn();
	const { getByText, getByPlaceholderText } = render(<ItemForm onItemAdded={onItemAdded} />);

	nock(API_ADDR)
		.post("/inventory/cheesecake", JSON.stringify({ quantity: 2 }))
		.reply(200);

	fireEvent.change(getByPlaceholderText("Item name"), { target: { value: "cheesecake" } });
	fireEvent.change(getByPlaceholderText("Quantity"), { target: { value: "2" } });
	fireEvent.click(getByText("Add item"));

	await waitFor(() => expect(nock.isDone()).toBe(true));

	expect(onItemAdded).toHaveBeenCalledTimes(1);
	expect(onItemAdded).toHaveBeenCalledWith("cheesecake", 2);
});
