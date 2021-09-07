const { addItem, data } = require("./inventoryController");

const validItems = ["cheesecake", "apple pie", "carrot cake"];

const updateItemList = inventory => {
	if (!inventory === null) return;

	localStorage.setItem("inventory", JSON.stringify(inventory));

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

const handleAddItem = event => {
	event.preventDefault();

	const { name, quantity } = event.target.elements;

	addItem(name.value, parseInt(quantity.value, 10));

	updateItemList(data.inventory);
};

const handleItemName = event => {
	const itemName = event.target.value;

	const errorMsg = window.document.getElementById("error-msg");

	if (itemName === "") {
		errorMsg.innerHTML = "";
	} else if (!validItems.includes(itemName)) {
		errorMsg.innerHTML = `${itemName} is not a valid item.`;
	} else {
		errorMsg.innerHTML = `${itemName} is valid!`;
	}
};

const checkFormValues = () => {
	const itemName = document.querySelector(`input[name="name"]`).value;
	const quantity = document.querySelector(`input[name="quantity"]`).value;

	const itemNameIsEmpty = itemName === "";
	const itemNameIsInvalid = !validItems.includes(itemName);
	const quantityIsEmpty = quantity === "";

	const errorMsg = window.document.getElementById("error-msg");
	if (itemNameIsEmpty) {
		errorMsg.innerHTML = "";
	} else if (itemNameIsInvalid) {
		errorMsg.innerHTML = `${itemName} is not a valid item.`;
	} else {
		errorMsg.innerHTML = `${itemName} is valid!`;
	}

	const submitButton = document.querySelector(`button[type="submit"]`);
	if (itemNameIsEmpty || itemNameIsInvalid || quantityIsEmpty) {
		submitButton.disabled = true;
	} else {
		submitButton.disabled = false;
	}
};

module.exports = { updateItemList, handleAddItem, handleItemName, checkFormValues };
