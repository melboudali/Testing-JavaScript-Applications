import React from "react";
import styled, { css, keyframes } from "styled-components";

const pulsate = keyframes`
	0% { opacity: .3; }
	50% { opacity: 1; }
	100% { opacity: .3; }
`;

const ListItem = styled.li`
	font-weight: ${({ quantity }) => (quantity < 5 ? "bold" : "normal")};
	color: ${({ quantity }) => (quantity < 5 ? "red" : "black")};
	${({ quantity }) =>
		quantity < 5 &&
		css`
			animation: ${pulsate} 2s infinite;
		`}
`;

const ItemList = ({ items }) => {
	const itemsList = Object.entries(items);
	return (
		<ul>
			{itemsList.map(([itemName, quantity]) => (
				<ListItem key={itemName} quantity={quantity}>
					{generateItemText(itemName, quantity)}
				</ListItem>
			))}
		</ul>
	);
};

export const generateItemText = (itemName, quantity) => {
	return `${itemName} - Quantity: ${quantity}`;
};

export default ItemList;
