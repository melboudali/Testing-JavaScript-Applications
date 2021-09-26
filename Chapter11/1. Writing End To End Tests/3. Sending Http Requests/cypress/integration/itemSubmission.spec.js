describe("item submission", () => {
	beforeEach(() => cy.task("emptyInventory"));
	it("contains the correct fields and a submission button", () => {
		cy.visit("http://localhost:8080");
		cy.get('input[placeholder="Item name"]');
		cy.get('input[placeholder="Quantity"]');
		cy.contains("button", "Add to inventory");
	});

	it("can add items through the form", () => {
		cy.visit("http://localhost:8080");
		cy.get('input[placeholder="Item name"]').type("carrot cake");
		cy.get('input[placeholder="Quantity"]').type("10");
		cy.get('button[type="submit"]').contains("Add to inventory").click();
		cy.contains("li", "carrot cake - Quantity: 17");
	});

	it("can undo submitted items", () => {
		cy.visit("http://localhost:8080");
		cy.get('input[placeholder="Item name"]').type("cheesecake");
		cy.get('input[placeholder="Quantity"]').type("10");
		cy.get('button[type="submit"]').contains("Add to inventory").click();

		cy.get('input[placeholder="Quantity"]').clear().type("5");
		cy.get('button[type="submit"]').contains("Add to inventory").click();

		cy.get("button").contains("Undo").click();

		cy
			.get("p")
			.then(p => {
				return Array.from(p).filter(p => {
					return p.innerText.includes('The inventory has been updated - {"cheesecake":10}');
				});
			})
			.should("have.length", 2);
	});

	it("saves each submission to the action log", () => {
		cy.visit("http://localhost:8080");
		cy.get('input[placeholder="Item name"]').type("cheesecake");
		cy.get('input[placeholder="Quantity"]').type("10");
		cy.get('button[type="submit"]').contains("Add to inventory").click();

		cy.get('input[placeholder="Quantity"]').clear().type("5");
		cy.get('button[type="submit"]').contains("Add to inventory").click();

		cy.get("button").contains("Undo").click();

		cy.contains("p", "The inventory has been updated - {}");

		cy
			.get("p")
			.then(p => {
				return Array.from(p).filter(p => {
					return p.innerText.includes('The inventory has been updated - {"cheesecake":10}');
				});
			})
			.should("have.length", 2);

		cy.contains("p", 'The inventory has been updated - {"cheesecake":15}');
	});

	describe("given a user enters an invalid item name", () => {
		it("disables the form's submission button", () => {
			cy.visit("http://localhost:8080");
			cy.get('input[placeholder="Item name"]').type("boat");
			cy.get('input[placeholder="Quantity"]').type("10");
			cy.get('button[type="submit"]').contains("Add to inventory").should("be.disabled");
		});
	});

	describe("when the application loads for the first time", () => {
		it("loads the initial list of items", () => {
			cy.addItem("cheesecake", 2);
			cy.addItem("apple pie", 5);
			cy.addItem("carrot cake", 96);
			cy.visit("http://localhost:8080");

			cy.contains("li", "cheesecake - Quantity: 2");
			cy.contains("li", "apple pie - Quantity: 5");
			cy.contains("li", "carrot cake - Quantity: 96");
		});
	});
});
