export class InventoryManagement {
	// ...
	static findAction(inventoryState) {
		return cy.clock(c => {
			const dateStr = new Date(fakeTimer.details().now).toISOString();

			return cy.get("p:not(:nth-of-type(1))").contains(`[${dateStr}]` + " The inventory has been updated - " + JSON.stringify(inventoryState));
		});
	}
}
