describe("item list updates", () => {
	beforeEach(() => cy.task("emptyInventory"));

	describe("as other users add items", () => {
		it("updates the item list", () => {
			cy.visit("http://localhost:8080");
			cy.wait(2000);
			cy.addItem("cheesecake", 22);
			cy.contains("li", "cheesecake - Quantity: 22");
		});
	});
});
