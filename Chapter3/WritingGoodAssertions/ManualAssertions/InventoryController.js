const inventory = new Map();

const getInventory = () => {
	const contentArray = Array.from(inventory.entries());
	const contents = contentArray.reduce((contents, [name, quantity]) => {
		return { ...contents, [name]: quantity };
	}, {});

	return {
		...contents,
		generatedAt: new Date(new Date().setYear(3000))
	};
};

module.exports = { inventory, getInventory };
