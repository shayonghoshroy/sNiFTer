/// <reference types="cypress" />

context("Wiki functionality", () => {
    beforeEach(() => {
        cy.visit("https://www.snifter.us/wiki/home");
    });

    it("All wiki elements loading", () => {
        cy.contains(" NFTs, or Non-Fungible Tokens, are a new technology that allows for the ownership of digital assets. Click here to learn more!");
        cy.contains("ERC-1155 and ERC-721");
        cy.contains("NFTs and the Environment");

        cy.contains("Crypto Wallets");
        cy.contains("Ethereum");
        cy.contains("Bitcoin");

        cy.contains("USD Coin");
    });

    it("Videos loading", () => {
        cy.contains(" NFTs, or Non-Fungible Tokens, are a new technology that allows for the ownership of digital assets. Click here to learn more!").click();
        cy.getIframe("#widget2");
        cy.go("back");

        cy.contains("ERC-1155 and ERC-721").click();
        cy.getIframe("#widget4");
        cy.go("back");

        cy.contains("Crypto Wallets").click();
        cy.getIframe("#widget6");
        cy.go("back");

        cy.contains("Ethereum").click();
        cy.getIframe("#widget8");
        cy.go("back");

        cy.contains("Bitcoin").click();
        cy.getIframe("#widget10");
        cy.go("back");

        cy.contains("USD Coin").click();
        cy.getIframe("#widget12");
        cy.go("back");
    });

    it("Quizzes work with correct answers", () => {

        cy.contains(" NFTs, or Non-Fungible Tokens, are a new technology that allows for the ownership of digital assets. Click here to learn more!").click();
        cy.get("div.sNiFTer.Quiz");
        cy.contains("Non Fungible Token").click();
        cy.contains("Check").click();

        cy.contains("No").click();
        cy.contains("Check").click();

        cy.contains("Selling NFTs on the Polygon blockchain").click();
        cy.contains("Check").click();

        cy.contains("All of the above").click();
        cy.contains("Check").click();
        cy.contains("score: 100%");
        cy.go("back");

        cy.contains("ERC-1155 and ERC-721").click();
        cy.contains("Semi-fungibility").click();
        cy.contains("Check").click();

        cy.contains("Non-fungibility").click();
        cy.contains("Check").click();

        cy.contains("To offer adopters more security with regard to originality").click();
        cy.contains("Check").click();
        cy.contains("score: 100%");
        cy.go("back");
        
        cy.contains("NFTs and the Environment").click();
        cy.contains("Maintaining consensus of transactions").click();
        cy.contains("Check").click();

        cy.get("button.va-button.va-button--default.va-button--large.answerButton").contains("Proof-of-stake").click();
        cy.contains("Check").click();

        cy.contains("Early 2022").click();
        cy.contains("Check").click();
        cy.contains("score: 100%");
        cy.go("back");

        cy.contains("Crypto Wallets").click();
        cy.contains("Store private keys for the blockchain").click();
        cy.contains("Check").click();

        cy.contains("No").click();
        cy.contains("Check").click();

        cy.contains("Obfuscated Wallet").click();
        cy.contains("Check").click();
        cy.contains("score: 100%");
        cy.go("back");

        cy.contains("Ethereum").click();
        cy.contains("Alterable").click();
        cy.contains("Check").click();

        cy.contains("Ethereum allows for the use of smart-contracts and dApps powered by the network").click();
        cy.contains("Check").click();

        cy.contains("A fee paid to miners and validators that process blockchain transactions").click();
        cy.contains("Check").click();
        cy.contains("score: 100%");
        cy.go("back");

        cy.contains("Bitcoin").click();
        cy.contains("A crypto blockchain that was created as a means of alternate currency exchange").click();
        cy.contains("Check").click();

        cy.get("button.va-button.va-button--default.va-button--large.answerButton").contains("No").click();
        cy.contains("Check").click();

        cy.contains("Bitcoin does not support smart contracts").click();
        cy.contains("Check").click();
        cy.contains("score: 100%");
        cy.go("back");

        cy.contains("USD Coin").click();
        cy.contains("By being backed by 1 US Dollar per 1 USDC").click();
        cy.contains("Check").click();

        cy.contains("USDC does").click();
        cy.contains("Check").click();

        cy.contains("Yes, down to the ten thousandth of a cent (0.000001 USD)").click();
        cy.contains("Check").click();
        cy.contains("score: 100%");
        cy.go("back");
    });

    it("Quizzes work with incorrect answers or no answers", () => {

        cy.contains(" NFTs, or Non-Fungible Tokens, are a new technology that allows for the ownership of digital assets. Click here to learn more!").click();
        cy.get("div.sNiFTer.Quiz");
        cy.contains("Nice Fancy Token").click();
        cy.contains("Check").click();

        cy.contains("No").click();
        cy.contains("Check").click();

        cy.contains("Selling NFTs on the Polygon blockchain").click();
        cy.contains("Check").click();

        cy.contains("All of the above").click();
        cy.contains("Check").click();
        cy.contains("score: 75%");
        cy.go("back");

        cy.contains("ERC-1155 and ERC-721").click();
        cy.contains("Non-fungibility").click();
        cy.contains("Check").click();

        cy.contains("Semi-fungibility").click();
        cy.contains("Check").click();

        cy.contains("To offer adopters more security with regard to originality").click();
        cy.contains("Check").click();
        cy.contains("score: 33%");
        cy.go("back");
        
        cy.contains("NFTs and the Environment").click();
        cy.contains("Maintaining consensus of transactions").click();
        cy.contains("Check").click();

        cy.get("button.va-button.va-button--default.va-button--large.answerButton").contains("Proof-of-stake").click();
        cy.contains("Check").click();

        cy.contains("2024").click();
        cy.contains("Check").click();
        cy.contains("score: 67%");
        cy.go("back");

        cy.contains("Crypto Wallets").click();
        cy.contains("Store USD anonymously").click();
        cy.contains("Check").click();

        cy.get("button.va-button.va-button--default.va-button--large.answerButton").contains("Yes").click();
        cy.contains("Check").click();

        cy.contains("Hot Wallet").click();
        cy.contains("Check").click();
        cy.contains("score: 0%");
        cy.go("back");

        cy.contains("Ethereum").click();
        cy.contains("Digital").click();
        cy.contains("Check").click();

        cy.contains("Check").click();

        cy.contains("Check").click();
        cy.contains("score: 0%");
        cy.go("back");

        cy.contains("Bitcoin").click();
        cy.contains("A crypto blockchain that was created as a means of alternate currency exchange").click();
        cy.contains("Check").click();

        cy.get("button.va-button.va-button--default.va-button--large.answerButton").contains("Yes").click();
        cy.contains("Check").click();

        cy.contains("Bitcoin is a less popular currency than ETH").click();
        cy.contains("Check").click();
        cy.contains("score: 33%");
        cy.go("back");

        cy.contains("USD Coin").click();
        cy.contains("Currency exchange platforms force a $1 price").click();
        cy.contains("Check").click();

        cy.contains("USDC is faster than the Ethereum network").click();
        cy.contains("Check").click();

        cy.contains("Yes, down to the ten thousandth of a cent (0.000001 USD)").click();
        cy.contains("Check").click();
        cy.contains("score: 33%");
        cy.go("back");
    });
});