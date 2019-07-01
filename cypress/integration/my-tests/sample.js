
describe("Test colored slides", function() {
  it("Visit localhost", function() {
    cy.visit("http://localhost:3000/");

    cy.contains("Hello World");

    // cy.pause()
    // cy.debug()

    // cy.get(".slides").click({ force: true }).debug();

    cy.get(".slides").click()
  })
});
