/// <reference types="cypress" />

context("News", () => {
  beforeEach(() => {
        cy.visit("https://www.snifter.us/news");
  });

  //TODO fix scrolling bug
  it("Can use filter button", () => {
    //checking each filter option for tweets
    cy.get("div.va-dropdown").click();
    cy.get("div.va-list-item-label").contains("NFTs").click();
    cy.get("div.va-button__content").contains("Search").click();
    cy.get("div.tweetcontainer").children().should("exist");

    cy.reload();
    cy.get("div.va-dropdown").click();
    cy.get("div.va-list-item-label").contains("Creators").click();
    cy.get("div.va-button__content").contains("Search").click();
    cy.get("div.tweetcontainer").children().should("exist");

    cy.reload();
    cy.get("div.va-dropdown").click();
    cy.get("div.va-list-item-label").contains("Currency").click();
    cy.get("div.va-button__content").contains("Search").click();
    cy.get("div.tweetcontainer").children().should("exist");

    cy.reload();
    cy.get("div.va-dropdown").click();
    cy.get("div.va-list-item-label").contains("Network").click();
    cy.get("div.va-button__content").contains("Search").click();
    cy.get("div.tweetcontainer").children().should("exist");
  });

  it("Embedded tweets link to twitter page", () => {
    cy.get("div.tweetcontainer").children().first().click();
  });
});
