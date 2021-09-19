import React from "react";

const ItemList = ({ items }) => {
	const itemsList = Object.entries(items);
	return (
		<ul>
			{itemsList.map(([itemName, quantity]) => (
				<li key={itemName} className={quantity < 5 ? "almost-out-of-stock" : null}>
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
