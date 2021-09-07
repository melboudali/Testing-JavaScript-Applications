(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { addItem, data } = require("./inventoryController");

const validItems = ["cheesecake", "apple pie", "carrot cake"];

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

},{"./inventoryController":2}],2:[function(require,module,exports){
const data = { inventory: {} };

const addItem = (itemName, quantity) => {
	const currentQuantity = data.inventory[itemName] || 0;
	data.inventory[itemName] = currentQuantity + quantity;
};

module.exports = { data, addItem };

},{}],3:[function(require,module,exports){
const { addItem, data } = require("./inventoryController");
const { updateItemList, handleAddItem, checkFormValues } = require("./domController");

addItem("cheesecake", 3);
addItem("apple pie", 8);
addItem("carrot cake", 7);

updateItemList(data.inventory);

const form = document.getElementById("add-item-form");
form.addEventListener("submit", handleAddItem);
form.addEventListener("input", checkFormValues);

checkFormValues();

},{"./domController":1,"./inventoryController":2}]},{},[3]);
