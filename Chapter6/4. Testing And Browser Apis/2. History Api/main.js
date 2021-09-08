const { addItem, data } = require("./inventoryController");
const { updateItemList, handleAddItem, checkFormValues, handleUndo, handlePopstate } = require("./domController");

addItem("cheesecake", 3);
addItem("apple pie", 8);
addItem("carrot cake", 7);

updateItemList(data.inventory);

const form = document.getElementById("add-item-form");
form.addEventListener("submit", handleAddItem);
form.addEventListener("input", checkFormValues);

checkFormValues();

if (!inventory === null) return;

localStorage.setItem("inventory", JSON.stringify(inventory));

const undoButton = document.getElementById("undo-button");
undoButton.addEventListener("click", handleUndo);

window.addEventListener("popstate", handlePopstate);
