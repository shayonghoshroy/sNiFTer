/// <reference types="cypress" />

context("NFT", () => {
    let nftdata;
    before(() => {
        cy.fixture("nft").then((fData) => {
            nftdata = fData;
        });        
    });

    it("Drop down menus function properly", () => {
        cy.visit(nftdata.BAYCURL);
        cy.contains("Ownership").click();
        cy.contains(nftdata.BAYCOwner);

        cy.reload();
        cy.contains("Traits").click();

        cy.reload();
        cy.wait(6000);
        cy.get("div.va-collapse__header").contains("Transactions").click();
        cy.contains("Table");
        cy.contains("Chart");

        cy.reload();
        cy.wait(2000);
        cy.contains("Thirty Day Stats").click();
        cy.contains("Change").should("be.visible")

        cy.reload();
        cy.wait(2000);
        cy.contains("Weekly Stats").click();

        cy.reload();
        cy.wait(2000);
        cy.contains("Daily Stats").click();
    });

    it("Outgoing URLs work", () => {
        cy.visit(nftdata.AzukiURL)
        cy.get('a[href*="https://azuki.com/gallery"]').should("have.attr", "target", "_blank");
        cy.get('a[href*="https://azuki.com"').should("have.attr", "target", "_blank");
    });
});
