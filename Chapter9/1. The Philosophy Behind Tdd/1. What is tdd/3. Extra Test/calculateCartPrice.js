const calculateCartPrice = (arr, discount) => {
	const total = arr.reduce((sum, price) => {
		return sum + price;
	}, 0);

	return discount ? ((100 - discount) / 100) * total : total;
};

module.exports = { calculateCartPrice };
