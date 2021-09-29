import { InventoryManagement } from "../pageObjects/inventoryManagement";

describe("item list", () => {
	beforeEach(() => cy.task("emptyInventory"));

	it("can update an item's quantity", () => {
		cy.task("seedItem", { itemName: "cheesecake", quantity: 1 });
		InventoryManagement.visit();
		InventoryManagement.findItemEntry("cheesecake", "1");
		cy.percySnapshot();
	});
});
