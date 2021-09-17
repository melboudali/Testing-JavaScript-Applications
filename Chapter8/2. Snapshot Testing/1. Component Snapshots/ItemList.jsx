import React from "react";
import { Transition } from "react-spring";

const ItemList = ({ items }) => {
	const itemsList = Object.entries(items);
	return (
		<ul>
			<Transition
				items={itemsList}
				initial={null}
				keys={([itemName]) => itemName}
				from={{ fontSize: 0, opacity: 0 }}
				enter={{ fontSize: 18, opacity: 1 }}
				leave={{ fontSize: 0, opacity: 0 }}>
				{([itemName, quantity]) =>
					styleProps =>
						(
							<li key={itemName} style={styleProps}>
								{generateItemText(itemName, quantity)}
							</li>
						)}
			</Transition>
		</ul>
	);
};

export const generateItemText = (itemName, quantity) => {
	return `${itemName} - Quantity: ${quantity}`;
};

export default ItemList;
