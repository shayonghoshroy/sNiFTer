/// <reference types="cypress" />

context("UserAuth", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/signin");
  });

  // Ensures that the user can type their username in and then remove it
  it("Username can be input", () => {
    // https://http://localhost:8080/signin
    cy.get("#amplify-field-601d").type("user").should("have.value", "user");
  });

  it("Values can be cleared from the username input textbox", () => {
    // https://http://localhost:8080/signin
    cy.get("#amplify-field-601d")
      .type("Clear this text")
      .should("have.value", "Clear this text")
      .clear()
      .should("have.value", "");
  });
});
