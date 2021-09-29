describe("item list updates", () => {
	// ...

	describe("as other users add items", () => {
		it("updates the item list", () => {
			cy.server().route("http://localhost:3000/inventory").as("inventoryRequest");
			cy.visit("http://localhost:8080");
			cy.wait("@inventoryRequest");
			cy.addItem("cheesecake", 22);
			InventoryManagement.findItemEntry("cheesecake", "22");
		});
	});
});
