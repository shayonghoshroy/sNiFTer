/// <reference types="cypress" />

context("User functions", () => {
    let data;
    let nftdata;
    before(() => {
      cy.fixture("profile").then((fData) => {
          data = fData;
      });
      cy.fixture("nft").then((fData) => {
          nftdata = fData;
      });
    });

    beforeEach(() => {
        cy.visit("https://www.snifter.us/user");
        cy.get('input[name="username"').type(data.username);
        cy.get('input[name="password"').type(data.password);
        cy.contains("Sign in").click();
        cy.wait(5000);
      });

    it("User can add to and remove from favorites", () => {
        cy.visit(nftdata.MFersURL);
        //cy.on('uncaught:exception', (err, runnable) => { return false; })
        cy.get("div.nft-icon").first().click();
        cy.wait(3000);
        cy.get('a[href*="/user"]').click();
        cy.wait(3000);
        cy.get("div#nftcomponent").click();
        cy.wait(3000);
        cy.get("div.nft-icon").click();
        cy.wait(3000);
        cy.get('a[href*="/user"]').click();
        cy.wait(3000);
        cy.get("div#nftcomponent").should("not.exist");
        cy.contains("Sign Out").click()
    });

    it("User can add to and remove from watchlist", () => {
        cy.visit(nftdata.AzukiURL);
        //cy.on('uncaught:exception', (err, runnable) => { return false; })
        cy.get("div.watchlist-icon").click();
        cy.wait(3000);
        cy.get('a[href*="/user"]').click();
        cy.wait(3000);
        cy.get("div#nftcomponent").click();
        cy.wait(3000);
        cy.get("div.watchlist-icon").click();
        cy.wait(3000);
        cy.get('a[href*="/user"]').click();
        cy.wait(3000);
        cy.get("div#nftcomponent").should("not.exist");
        cy.contains("Sign Out").click()
    });

    //TODO test commenting
    it("User can create, edit, and delete comments on NFT", () => {
        cy.visit(nftdata.BAYCURL);
        //Enter text and clear it
        cy.wait(3000)
        cy.get("textarea.textarea.va-input__content__input").type("test");
        cy.get("div.rating-star").last().click();
        cy.contains("Clear").click();
        cy.get("textarea.textarea.va-input__content__input").should("have.value", "");

        //Enter text and post it
        cy.get("textarea.textarea.va-input__content__input").type("Cypress comment testing q1w2e3r4t5y6u7i8o9p0");
        cy.get("div.rating-star").last().click();
        cy.contains("Post").click();
        cy.reload();
        cy.wait(3000)
        cy.contains("Cypress comment testing q1w2e3r4t5y6u7i8o9p0").should("exist");
        //Open edit screen and close it
        cy.contains("edit").click();
        cy.contains("Cancel").click();

        //Edit post and post it
        cy.contains("edit").click();
        cy.get("textarea.textarea.va-input__content__input").last().clear().type("Cypress comment test2 1q2w3e4r5t6y7u8i9o0p");        
        cy.contains("Update Review").click();
        cy.reload();
        cy.wait(3000)

        cy.contains("Cypress comment test2 1q2w3e4r5t6y7u8i9o0p").should("exist");
        cy.contains("delete").click();
        cy.reload();
        cy.wait(3000);
        cy.contains("Cypress comment testing q1w2e3r4t5y6u7i8o9p0").should("not.exist");
        cy.visit("https://www.snifter.us/user");
        cy.contains("Sign Out").click();
    });

    it("User can progress in wiki quizzes", () => {
        cy.get('a[href*="wiki/home"]').click();
        cy.contains("done");
        cy.contains("Your current Wiki level is 1");
        cy.contains("80%");

        cy.contains("USD Coin").click();
        cy.contains("Currency exchange platforms force a $1 price").click();
        cy.contains("Check").click();

        cy.contains("USDC is faster than the Ethereum network").click();
        cy.contains("Check").click();

        cy.contains("Yes, down to the ten thousandth of a cent (0.000001 USD)").click();
        cy.contains("Check").click();
        cy.contains("score: 33%");
        cy.go("back");

        cy.contains("80%");
    });
});