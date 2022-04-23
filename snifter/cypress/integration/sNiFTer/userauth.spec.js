/// <reference types="cypress" />

context("UserAuth", () => {

  let data;
  before(() => {
    cy.fixture('profile').then((fData) => {
        data = fData;
    });
  });

  beforeEach(() => {
    cy.visit("http://www.snifter.us/user");
  });

  // Ensures that the user can type their username in and then remove it
  it("Username can be input", () => {
    // https://http://localhost:8080/signin
    cy.get('input[name="username"').type("user").should("have.value", "user");
  });

  it("Values can be cleared from the username input textbox", () => {
    // https://http://localhost:8080/signin
    cy.get('input[name="username"').type("Clear this text").should("have.value", "Clear this text").clear().should("have.value", "");
  });

  it("User can sign in", () => {
    cy.get('input[name="username"').type(data.username);
    cy.get('input[name="password"').type(data.password);
    cy.get('button.amplify-button.amplify-field-group__control').contains("Sign in").click();
    cy.get('div.profilepic.mb-3')
  });
});
