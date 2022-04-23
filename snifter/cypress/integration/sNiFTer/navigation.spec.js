/// <reference types="cypress" />

context("Navigation", () => {

  beforeEach(() => {
      cy.visit("http://www.snifter.us");
      cy.on('uncaught:exception', (err, runnable) => { return false; })
  });

  it("Can navigate around website", () => {
    cy.get('a[href*="about"]').click();
    cy.location("pathname").should("match", /\/about$/);
    cy.contains("A little about us");

    cy.get('a[href*="news"]').click();
    cy.location("pathname").should("match", /\/news$/);
    cy.contains("See what's hot in the world of NFT's");

    cy.get('a[href*="search"]').click();
    cy.location("pathname").should("match", /\/search$/);
    cy.contains("Take your pick");

    cy.get('a[href*="wiki/home"]').click();
    cy.location("pathname").should("match", /\/home$/);
    cy.contains("Welcome to the sNiFTer Wiki");

    cy.get('a[href*="/user"]').click();
    cy.location("pathname").should("match", /\/user$/);
    cy.contains("Forgot your password");

    cy.contains("sNiFTer").click();
    cy.contains("Welcome to sNiFTer");
  });
});