const generateItemRow = ({ name, quantity, price }) => {
	// return `${name},${quantity},${price},${quantity * price}`;
	return !!price && !!quantity ? [name, quantity, price, price * quantity].join(",") : null;
};

const generateTotalRow = items => {
	// let total = 0;
	// items.forEach(({ quantity, price }) => {
	// 	if (!!quantity || !!price) total += price * quantity;
	// });
	const total = items.reduce((t, { price, quantity }) => t + price * quantity, 0);
	return `Total,,,${total}`;
};

module.exports = { generateItemRow, generateTotalRow };
