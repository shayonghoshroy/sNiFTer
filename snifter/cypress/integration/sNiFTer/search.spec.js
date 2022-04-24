/// <reference types="cypress" />

context("Search", () => {
    beforeEach(() => {
        cy.visit("http://www.snifter.us/search");
      });

    it("Can use filter button", () => {
        cy.get("div.va-button-dropdown").click();
        cy.get("div.va-list-item-label").contains("Token Name").click();
        cy.get("label.va-input__label").contains("NFT Name");

        cy.get("div.va-button-dropdown").click();
        cy.get("div.va-list-item-label").contains("Owner").click();
        cy.get("label.va-input__label").contains("Address");

        cy.get("div.va-button-dropdown").click();
        cy.get("div.va-list-item-label").contains("Focused").click();
        cy.get("label.va-input__label").contains("Address");

        cy.get("div.va-button-dropdown").click();
        cy.get("div.va-list-item-label").contains("Collection Name").click();
        cy.get("label.va-input__label").contains("Search By Collection Name");

        cy.get("div.va-button-dropdown").click();
        cy.get("div.va-list-item-label").contains("Number of Sales").click();
        cy.get("label.va-input__label").contains("Value");
    });

    it("Can input search values", () => {
        cy.get('input[class="va-input__content__input"').type("bored ape yacht club");
        cy.on('uncaught:exception', (err, runnable) => { return false; })
        cy.contains("Bored Ape Yacht Club").click()
        cy.get("div.va-button__content").contains("Search").click({ force: true });
        cy.get("div#nftcomponent")
/*
        cy.get("div.va-button-dropdown").click();
        cy.get("div.va-list-item-label").contains("Token Name").click();
        cy.get("label.va-input__label").contains("NFT Name");
        cy.get('input[class="va-input__content__input"').clear().type("Bored Ape Yacht Club");
        */
    });
});