const fs = require("fs");

module.exports.generateReport = items => {
	const lines = items.map(({ item, quantity, price }) => {
		return `${item} - Quantity: ${quantity} - Value: ${price * quantity}`;
	});
	const totalValue = items.reduce((sum, { price }) => {
		return sum + price;
	}, 0);

	const content = lines.concat(`Total value: ${totalValue}`).join("\n");
	fs.writeFileSync(`${__dirname}/report.txt`, content);
};
