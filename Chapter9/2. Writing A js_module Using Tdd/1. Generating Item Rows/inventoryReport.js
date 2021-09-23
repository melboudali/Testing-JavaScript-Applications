const generateItemRow = ({ name, quantity, price }) => {
	// return `${name},${quantity},${price},${quantity * price}`;
	return !!price && !!quantity ? [name, quantity, price, price * quantity].join(",") : null;
};

module.exports = { generateItemRow };
