import React from "react";

const ItemList = ({ items }) => {
	return (
		<ul>
			{Object.entries(items).map(([itemName, quantity]) => {
				return <li key={itemName}>{generateItemText(itemName, quantity)}</li>;
			})}
		</ul>
	);
};

export const generateItemText = (itemName, quantity) => {
	return `${itemName} - Quantity: ${quantity}`;
};

export default ItemList;
