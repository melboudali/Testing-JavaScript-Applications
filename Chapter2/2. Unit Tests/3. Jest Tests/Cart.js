class Cart {
	constructor() {
		this.items = [];
	}
	addToCart(item) {
		this.items.push(item);
	}
	removeFromCart(item) {
		for (let i = 0; i <= this.items.length; i++) {
			if (this.items[i] === item) {
				this.items.splice(i, 1);
				return;
			}
		}
	}
}

module.exports = Cart;
