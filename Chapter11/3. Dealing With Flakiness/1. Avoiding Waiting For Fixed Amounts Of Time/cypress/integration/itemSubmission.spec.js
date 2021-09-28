describe("item submission", () => {
	// ...

	it("can undo submitted items", () => {
		InventoryManagement.visit();
		InventoryManagement.findAction({});

		cy.window().then(({ handleAddItem }) => {
			handleAddItem("cheesecake", 10);
		});
		InventoryManagement.findAction({ cheesecake: 10 });

		cy.window().then(({ handleAddItem }) => {
			handleAddItem("cheesecake", 5);
		});
		InventoryManagement.findAction({ cheesecake: 15 });

		InventoryManagement.undo();
		InventoryManagement.findItemEntry("cheesecake", "10");
	});

	it("saves each submission to the action log", () => {});

	it("can add items through the form", () => {});

	it("can add items through the form", () => {
		InventoryManagement.visit();
		cy.window().then(w => cy.stub(w.Math, "random").returns(0.5));

		// ...
	});
});
