import React from "react";

const almostOutOfStock = { fontWeight: "bold", color: "red" };

const ItemList = ({ items }) => {
	const itemsList = Object.entries(items);
	return (
		<ul>
			{itemsList.map(([itemName, quantity]) => (
				<li key={itemName} style={quantity < 5 ? almostOutOfStock : null}>
					{generateItemText(itemName, quantity)}
				</li>
			))}
		</ul>
	);
};

export const generateItemText = (itemName, quantity) => {
	return `${itemName} - Quantity: ${quantity}`;
};

export default ItemList;
