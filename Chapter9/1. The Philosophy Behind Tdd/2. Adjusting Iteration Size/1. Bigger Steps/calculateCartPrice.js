const calculateCartPrice = (arr, discount) => {
	const total = arr.reduce((sum, price) => sum + price, 0);
	const lastPrice = ((100 - discount) / 100) * total;
	return discount && typeof discount === "number" && !isNaN(discount) ? lastPrice : total;
};

module.exports = { calculateCartPrice };
