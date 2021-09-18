import React, { useState } from "react";
import { API_ADDR } from "./constants";

const addItemRequest = async (itemName, quantity) => {
	await fetch(`${API_ADDR}/inventory/${itemName}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ quantity })
	});
};

const ItemForm = ({ onItemAdded }) => {
	const [itemName, setItemName] = useState("");
	const [quantity, setQuantity] = useState(0);

	const onSubmit = e => {
		e.preventDefault();
		addItemRequest(itemName, quantity);
		if (onItemAdded) onItemAdded(itemName, quantity);
	};

	return (
		<form onSubmit={onSubmit}>
			<input onChange={e => setItemName(e.target.value)} placeholder="Item name" />
			<input onChange={e => setQuantity(parseInt(e.target.value, 10))} placeholder="Quantity" />
			<button type="submit">Add item</button>
		</form>
	);
};

export default ItemForm;
