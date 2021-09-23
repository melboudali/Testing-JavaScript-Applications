const fs = require("fs");

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

const createInventoryValuesReport = items => {
	const itemRows = items.map(generateItemRow).join("\n");
	const totalRow = generateTotalRow(items);
	const reportContents = itemRows + "\n" + totalRow;
	fs.writeFileSync(`${__dirname}/inventoryValues.csv`, reportContents);
};

module.exports = { generateItemRow, generateTotalRow, createInventoryValuesReport };
