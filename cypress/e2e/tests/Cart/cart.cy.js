import loginPage from "../../pages/login.page"
import cartPage from "../../pages/cart.page"
import inventoryPage from "../../pages/inventory.page"
import { standardUser } from "../../data/login.data"
import { item1, item2 } from "../../data/products.data"
import productPage from "../../pages/product.page"

describe("Checkout Flow", () => {
    // variables
    let itemInfo = [item1.no, item1.name, item1.price]

    beforeEach(() => {
        //go to base url        
        cy.visit("/")

        cy.clearCookies()
        
        // assert that the user is on the correct page
        cy.url().should("eq", "https://www.saucedemo.com/")

        // assert that the input fields for login is visible
        cy.get(loginPage.usernameInput).should("be.visible")
        cy.get(loginPage.passwordInput).should("be.visible")               
        cy.get(loginPage.loginButton).should("be.visible")
        
         // login with a valid user
         loginPage.login(standardUser.username, standardUser.password)
 
         // assert that the user logs in successfully and can see the inventory page, inventory items and cart button
         cy.url().should("eq","https://www.saucedemo.com/inventory.html")
         cy.get(inventoryPage.getItemInformation(item1.no)).should("be.visible") //first item
         cy.get(inventoryPage.getItemName(item1.no)).should("have.text", item1.name)
         cy.get(inventoryPage.getItemInformation(item2.no)).should("be.visible") //second item
         cy.get(inventoryPage.getItemName(item2.no)).should("have.text", item2.name)
         cy.get(inventoryPage.cartButton).should("be.visible")
    })

    it("should add and remove one item from cart for standard user", () => {
       // add first item to the cart
        inventoryPage.addToCart(itemInfo[0])

        // assert that the item is added to the cart
        cy.get(inventoryPage.cartBadge).should("be.visible")
        cy.get(inventoryPage.cartBadge).should("have.text", "1")
        

        // should go to cart
        cy.get(".shopping_cart_link").click()
        cy.url().should("eq","https://www.saucedemo.com/cart.html")

        // assert that the item is in the cart
        cy.get(cartPage.title).should("have.text", "Your Cart")
        cy.get(cartPage.getItemInformation(itemInfo[0])).should("exist")
        cy.get(cartPage.getItemName(itemInfo[0])).should("have.text", itemInfo[1])
        cy.get(cartPage.getItemPrice(itemInfo[0])).should("have.text", `$${itemInfo[2].toString()}`)

        // remove from cart 
        cartPage.removeFromCart(1)

        // assert that the items are removed from the cart
        cy.get(inventoryPage.cartBadge).should("not.exist")
        cy.get(cartPage.cartList).should("not.exist")

        // log out user
        inventoryPage.logout()

        // assert that the user is logged out
        cy.url().should("eq", "https://www.saucedemo.com/")
    })


    it("should complete a checkout flow with one item (from the product page) for standard user", () => {
        // go to product page
        inventoryPage.goToProductPage(itemInfo[0])

        // assert that the user is redirected to the product page
        cy.url().should("contain", "https://www.saucedemo.com/inventory-item")
        productPage.addToCart()

        // assert that the item is added to the cart
        cy.get(inventoryPage.cartBadge).should("be.visible")
        cy.get(inventoryPage.cartBadge).should("have.text", "1")
        

        // remove from cart
        productPage.removeFromCart()

        // assert that the items are removed from the cart
        cy.get(".shopping_cart_link").click()
        cy.url().should("eq","https://www.saucedemo.com/cart.html")

        // assert that the item is in the cart
        cy.get(inventoryPage.cartBadge).should("not.exist")

        // log out user
        inventoryPage.logout()

        // assert that the user is logged out
        cy.url().should("eq", "https://www.saucedemo.com/")
    })
    
    
    it("should complete a checkout flow with one item (from the inventory page) for standard user", () => {
        // add first item to the cart
        inventoryPage.addToCart(itemInfo[0])

        // assert that the item is added to the cart
        cy.get(inventoryPage.cartBadge).should("be.visible")
        cy.get(inventoryPage.cartBadge).should("have.text", "1")

        // remove item from cart
        inventoryPage.removeFromCart(itemInfo[0])
        
        // assert that the items are removed from the cart
        cy.get(inventoryPage.cartBadge).should("not.exist")
        cy.get(cartPage.cartList).should("not.exist")

        // log out user
        inventoryPage.logout()

        // assert that the user is logged out
        cy.url().should("eq", "https://www.saucedemo.com/")
    })

})