const calculateCartPrice = arr => {
	return arr.reduce((sum, price) => {
		return sum + price;
	}, 0);
};

module.exports = { calculateCartPrice };
