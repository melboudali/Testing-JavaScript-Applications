describe("item submission", () => {
	// ...
	beforeEach(() => {
		cy.server();
		cy.route("GET", "/inventory/cheesecake", {
			recipes: [
				{ href: "http://example.com/always-the-same-url/first-recipe" },
				{ href: "http://example.com/always-the-same-url/second-recipe" },
				{ href: "http://example.com/always-the-same-url/third-recipe" }
			]
		});
	});

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

	it("saves each submission to the action log", () => {
		InventoryManagement.visit();
		InventoryManagement.findAction({});
		cy.clock().tick(1000);

		InventoryManagement.addItem("cheesecake", "10");
		InventoryManagement.findAction({ cheesecake: 10 });
		cy.clock().tick(1000);

		InventoryManagement.addItem("cheesecake", "5");
		InventoryManagement.findAction({ cheesecake: 15 });
		cy.clock().tick(1000);

		InventoryManagement.undo();

		InventoryManagement.findItemEntry("cheesecake", "10");
		InventoryManagement.findAction({ cheesecake: 10 });
	});

	it("can add items through the form", () => {
		InventoryManagement.visit();
		cy.window().then(w => cy.stub(w.Math, "random").returns(0.5));

		InventoryManagement.addItem("cheesecake", "10");
		InventoryManagement.findItemEntry("cheesecake", "10")
			.get("a")
			.should("have.attr", "href", "http://example.com/always-the-same-url/second-recipe");
	});

	it("can add items through the form", () => {
		InventoryManagement.visit();
		cy.window().then(w => cy.stub(w.Math, "random").returns(0.5));

		// ...
	});
});
