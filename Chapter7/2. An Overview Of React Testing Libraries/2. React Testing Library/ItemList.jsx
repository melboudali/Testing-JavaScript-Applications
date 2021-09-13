import React from "react";

const ItemList = ({ items }) => {
	return (
		<ul>
			{Object.entries(items).map(([itemName, quantity]) => {
				return (
					<li key={itemName}>
						{itemName} - Quantity: {quantity}
					</li>
				);
			})}
		</ul>
	);
};
export default ItemList;
