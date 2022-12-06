import loginPage from "../../pages/login.page"
import cartPage from "../../pages/cart.page"
import inventoryPage from "../../pages/inventory.page"
import userData from "../../data/users.data"
import { item1, item2, item3, item4, item5, item6 } from "../../data/products.data"

describe("Checkout Flow", () => {
    before(() => {
        //go to base url        
        cy.visit("/")
        cy.clearCookies()
    })

    it("should complete a checkout flow with one item", () => {
        // assert that the user is on the correct page
        cy.url().should("eq", "https://www.saucedemo.com/")

        // assert that the input fields for login is visible
        cy.get(loginPage.usernameInput).should("be.visible")
        cy.get(loginPage.passwordInput).should("be.visible")        
        
        // login with a valid user
        loginPage.login(userData.standardUser.username, userData.standardUser.password)

        // assert that the user logs in successfully and can see the inventory page, inventory items and cart button
        cy.url().should("eq","https://www.saucedemo.com/inventory.html")
        cy.get(inventoryPage.getItemInformation(item1.no)).should("be.visible") //first item
        cy.get(inventoryPage.getItemName(item1.no)).should("have.text", item1.name)
        cy.get(inventoryPage.getItemInformation(item2.no)).should("be.visible") //second item
        cy.get(inventoryPage.getItemName(item2.no)).should("have.text", item2.name)
        cy.get(inventoryPage.cartButton).should("be.visible")


        // add first item to the cart
        inventoryPage.addToCart(item1.no)

        // assert that the item is added to the cart
        cy.get(inventoryPage.cartBadge).should("be.visible")
        cy.get(inventoryPage.cartBadge).should("have.text", "1")
        

        // should go to cart
        cy.get(".shopping_cart_link").click()
        cy.url().should("eq","https://www.saucedemo.com/cart.html")

        // assert that the item is in the cart
        cy.get(cartPage.title).should("have.text", "Your Cart")
        cy.get(cartPage.getItemInformation(item1.no)).should("exist")
        cy.get(cartPage.getItemName(item1.no)).should("have.text", item1.name)
        cy.get(cartPage.getItemPrice(item1.no)).should("have.text", `$${item1.price.toString()}`)

        
        // should checkout successfully
        cartPage.checkout()
        
    
    })


    it.skip("should complete a checkout flow with multiple items", () => {
        //check url 
        cy.url().contains("saucedemo")
        
        //login using standard user credentials
        cy.get("#user-name").should("be.visible").type("standard_user")
        cy.get("#password").should("be.visible").type("secret_sauce{enter}")

        // user goes to the list of items
        cy.url().should("eq","https://www.saucedemo.com/inventory.html")
        
        //add  second item in inventory list 
        //cy.get("#inventory_container .inventory_list .inventory_item:nth-child(2) .inventory_item_description button").click()
        cy.get("#add-to-cart-sauce-labs-bike-light").click()

        //check that cart number increments
        cy.get(".shopping_cart_badge").should("be.visible");
        cy.get(".shopping_cart_badge").should("have.text", "1");

        //should go to cart
        cy.get(".shopping_cart_link").click()
        cy.url().should("eq","https://www.saucedemo.com/cart.html")

        //remove item
        //cy.get("#cart_contents_container .cart_list > div:nth-child(3) button").should("eq","Remove")
        cy.get("#remove-sauce-labs-bike-light").should("exist").click()
        
        //nothing should be in the cart / cart number does not exist
        cy.get(".shopping_cart_badge").should("not.exist");
    
    })
})
