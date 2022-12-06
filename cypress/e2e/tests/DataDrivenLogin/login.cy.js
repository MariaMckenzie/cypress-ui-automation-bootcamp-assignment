import loginPage from "../../pages/login.page"
import inventoryPage from "../../pages/inventory.page"
import { standardUser, performanceGlitchUser, problemUser, lockedOutUser, missingData, missingUsername, missingPassword } from "../../data/login.data"
import { item1 } from "../../data/products.data"

describe("Data Driven Login", () => {
    beforeEach(() => {
        //go to base url        
        cy.visit("/")
        cy.clearCookies()
    })

    it("Assert that the login page can facilitate login", () => {
        // assert that the user is on the correct page
        cy.url().should("eq", "https://www.saucedemo.com/")

        // assert that the input fields for login is visible
        cy.get(loginPage.usernameInput).should("be.visible")
        cy.get(loginPage.passwordInput).should("be.visible")        
        cy.get(loginPage.loginButton).should("be.visible")
    })


    it("Log in as a standard user (with valid credentials)", () => {        
        // login with a valid user
        loginPage.login(standardUser.username, standardUser.password)

        // assert that the user logs in successfully and can see the inventory page, inventory items and cart button
        cy.url().should("eq","https://www.saucedemo.com/inventory.html")
        cy.get(inventoryPage.getItemInformation(item1.no)).should("be.visible") //first item
        cy.get(inventoryPage.getItemName(item1.no)).should("have.text", item1.name)
        cy.get(inventoryPage.cartButton).should("be.visible")

         // log out user
         inventoryPage.logout()
 
         // assert that the user is logged out
         cy.url().should("eq", "https://www.saucedemo.com/")
    })


    it("Log in as a locked out user", () => {        
         // attempt to log in
        loginPage.login(lockedOutUser.username, lockedOutUser.password)

        cy.get(loginPage.loginError).should("be.visible")
        cy.get(loginPage.loginError).should("contain", lockedOutUser.errorMsg)

        // assert that the user did not log in
        cy.url().should("not.eq","https://www.saucedemo.com/inventory.html")
        cy.get(inventoryPage.inventoryList).should("not.exist") 
        cy.get(inventoryPage.cartButton).should("not.exist")
    })


    it("Log in as a performance glitch user", () => {        
        // login with as a performance glitch user
        loginPage.login(performanceGlitchUser.username, performanceGlitchUser.password)

        // assert that the user logs in successfully and can see the inventory page, inventory items and cart button after a certain time
        cy.url().should("eq","https://www.saucedemo.com/inventory.html")

        /**
         * According to the saucedemo.com source code [view in Dev Tools > Sources > static > js > pages > inventory.jsx (lines 25-28)],
         * for a performance glitch user the page should be visible after 5 seconds. The code snippet is as follows:
         *      // istanbul ignore next
                if (isPerformanceGlitchUser()) {
                     startPerformanceGlitch(5000);
                }
         */
        cy.get(inventoryPage.inventoryList, {timeout: 5000}) .should('be.visible') 
        cy.get(inventoryPage.getItemInformation(item1.no)).should("be.visible") //first item
        cy.get(inventoryPage.getItemName(item1.no)).should("have.text", item1.name)
        cy.get(inventoryPage.cartButton).should("be.visible")
        
        // log out user
        inventoryPage.logout()
 
        // assert that the user is logged out
        cy.url().should("eq", "https://www.saucedemo.com/")
    })


    it("Log in as a problem user", () => {        
        // login as a problem user
        loginPage.login(problemUser.username, problemUser.password)

        // assert that the user logs in successfully and can see the inventory page, inventory items and cart button
        cy.url().should("eq","https://www.saucedemo.com/inventory.html")

        /**
         * According to the saucedemo.com source code [view in Dev Tools > Sources > static > js > pages > inventory.jsx], 
         * nothing happens once a problem user logs in
         */
        cy.get(inventoryPage.getItemInformation(item1.no)).should("be.visible") //first item
        cy.get(inventoryPage.getItemName(item1.no)).should("have.text", item1.name)
        cy.get(inventoryPage.cartButton).should("be.visible")
        
        // log out user
        inventoryPage.logout()
 
        // assert that the user is logged out
        cy.url().should("eq", "https://www.saucedemo.com/")
    })


    it("Cannot log in when all form fields are empty", () => {        
        // attempt to log in
        loginPage.login(missingData.username, missingData.password)

        cy.get(loginPage.loginError).should("be.visible")
        cy.get(loginPage.loginError).should("contain", missingData.errorMsg)

        // assert that the user did not log in
        cy.url().should("not.eq","https://www.saucedemo.com/inventory.html")
        cy.get(inventoryPage.inventoryList).should("not.exist") 
        cy.get(inventoryPage.cartButton).should("not.exist")
    })


    it("Cannot log in when username input field is empty", () => {
        // attempt to log in with missing username
       loginPage.login(missingUsername.username, missingUsername.password)

       cy.get(loginPage.loginError).should("be.visible")
       cy.get(loginPage.loginError).should("contain", missingUsername.errorMsg)

       // assert that the user did not log in
       cy.url().should("not.eq","https://www.saucedemo.com/inventory.html")
       cy.get(inventoryPage.inventoryList).should("not.exist") 
       cy.get(inventoryPage.cartButton).should("not.exist")
    })


    it("Cannot log in when password input field is empty", () => {
    // attempt to log in with missing password
    loginPage.login(missingPassword.username, missingPassword.password)

    cy.get(loginPage.loginError).should("be.visible")
    cy.get(loginPage.loginError).should("contain", missingPassword.errorMsg)

        // assert that the user did not log in
        cy.url().should("not.eq","https://www.saucedemo.com/inventory.html")
        cy.get(inventoryPage.inventoryList).should("not.exist") 
        cy.get(inventoryPage.cartButton).should("not.exist")
    })

})
