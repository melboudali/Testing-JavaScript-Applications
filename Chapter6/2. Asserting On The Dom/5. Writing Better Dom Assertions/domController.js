const updateItemList = inventory => {
	const inventoryList = window.document.getElementById("item-list");

	inventoryList.innerHTML = "";

	Object.entries(inventory).forEach(([itemName, quantity]) => {
		const listItem = window.document.createElement("li");
		listItem.innerHTML = `${itemName} - Quantity: ${quantity}`;
		if (quantity < 5) {
			listItem.classList.add("almost-soldout");
		}

		inventoryList.appendChild(listItem);
	});

	const inventoryContents = JSON.stringify(inventory);
	const p = window.document.createElement("p");
	p.innerHTML = `The inventory has been updated - ${inventoryContents}`;
	window.document.body.appendChild(p);
};

module.exports = { updateItemList };
