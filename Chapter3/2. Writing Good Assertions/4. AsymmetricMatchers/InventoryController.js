const inventory = new Map();

const addToInventory = (item, n) => {
	if (typeof n !== "number") throw new Error("quantity must be a number");
	const currentQuantity = inventory.get(item) || 0;
	const newQuantity = currentQuantity + n;
	inventory.set(item, newQuantity);
	return newQuantity;
};

// a function that returns the content of your inventory indexed by name. For auditing purposes,
// this function will also include the date at which the information was generated
const getInventory = () => {
	const contentArray = Array.from(inventory.entries());
	const contents = contentArray.reduce((contents, [name, quantity]) => {
		return { ...contents, [name]: quantity };
	}, {});

	return { ...contents, generatedAt: new Date() };
};

module.exports = { inventory, addToInventory, getInventory };
