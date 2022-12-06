/* istanbul ignore next 
const addToCart = (itemId) => {
    if (isProblemUser()) {
      // Bail out now, don't add to cart if the item ID is odd
      if (itemId % 2 === 1) {
        return;
      }
    }



    const handleLastNameChange = (evt) => {
        if (isProblemUser()) {
          // Overwrite the firstname also
          return setFirstName(evt.target.value);
        }
    */
import loginPage from "../../pages/login.page"
import cartPage from "../../pages/cart.page"
import inventoryPage from "../../pages/inventory.page"
import checkoutPage from "../../pages/checkout.page"
import { standardUser } from "../../data/login.data"
import { item1, item2, item3, item4, item5, item6 } from "../../data/products.data"
import { user1, user2, user3, user4, user5 } from "../../data/users.data"
import productPage from "../../pages/product.page"

describe("Checkout Flow", () => {
    beforeEach(() => {
        //go to base url        
        cy.visit("/")
        cy.clearCookies()
    })

    it("should add and remove one item from cart for standard user", () => {        
        // variables
        let itemInfo = [
            [item3.no, item3.name, item3.price],
            [item4.no, item4.name, item4.price],
            [item5.no, item5.name, item5.price],
        ], total = itemInfo[0][2] + itemInfo[1][2] + itemInfo[2][2]

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
        cy.get(inventoryPage.getItemInformation(item4.no)).should("be.visible") //second item
        cy.get(inventoryPage.getItemName(item4.no)).should("have.text", item4.name)
        cy.get(inventoryPage.cartButton).should("be.visible")


        // add some items to the cart
        inventoryPage.addToCart(itemInfo[0][0])
        inventoryPage.addToCart(itemInfo[1][0])
        inventoryPage.addToCart(itemInfo[2][0])

        // assert that the items are added to the cart
        cy.get(inventoryPage.cartBadge).should("be.visible")
        cy.get(inventoryPage.cartBadge).should("have.text", "3")
        

        // should go to cart
        cy.get(".shopping_cart_link").click()
        cy.url().should("eq","https://www.saucedemo.com/cart.html")

        // assert that the items are in the cart
        cy.get(cartPage.title).should("have.text", "Your Cart")
        cy.get(cartPage.getItemInformation(1)).should("exist")
        cy.get(cartPage.getItemName(1)).should("have.text", itemInfo[0][1])
        cy.get(cartPage.getItemPrice(1)).should("have.text", `$${itemInfo[0][2].toString()}`)

        cy.get(cartPage.getItemInformation(2)).should("exist")
        cy.get(cartPage.getItemName(2)).should("have.text", itemInfo[1][1])
        cy.get(cartPage.getItemPrice(2)).should("have.text", `$${itemInfo[1][2].toString()}`)

        cy.get(cartPage.getItemInformation(3)).should("exist")
        cy.get(cartPage.getItemName(3)).should("have.text", itemInfo[2][1])
        cy.get(cartPage.getItemPrice(3)).should("have.text", `$${itemInfo[2][2].toString()}`)


            // should checkout successfully
            cartPage.checkout()

            // assert that the user moves on to the first step of checkout page
            cy.url().should("eq", "https://www.saucedemo.com/checkout-step-one.html")
            cy.get(checkoutPage.title).should("have.text", "Checkout: Your Information")
            cy.get(checkoutPage.firstnameInput).should("be.visible")
            cy.get(checkoutPage.lastnameInput).should("be.visible")
            cy.get(checkoutPage.continueButton).should("be.visible")
    
            // continue to step two
            checkoutPage.continueToStepTwo(user1.firstname, user1.lastname, user1.postal)
    
            // assert that the user is at step two
            cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html")
            cy.get(checkoutPage.title).should("have.text", "Checkout: Overview")
    
            // assert that the items selected are the same in checkout and the subtotal is correct
            cy.get(checkoutPage.checkCartItemName(1)).should("have.text", itemInfo[0][1])
            cy.get(checkoutPage.checkCartItemPrice(1)).should("have.text", `$${itemInfo[0][2]}`)
            cy.get(checkoutPage.checkCartItemName(2)).should("have.text", itemInfo[1][1])
            cy.get(checkoutPage.checkCartItemPrice(2)).should("have.text", `$${itemInfo[1][2]}`)
            cy.get(checkoutPage.checkCartItemName(3)).should("have.text", itemInfo[2][1])
            cy.get(checkoutPage.checkCartItemPrice(3)).should("have.text", `$${itemInfo[2][2]}`)

            cy.get(checkoutPage.subtotal).should("have.text", `Item total: $${total}`) //confirm total cost of items before tax
    
            // complete checkout
            checkoutPage.completeStepTwo()
    
            // assert that checkout is complete
            cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html")
            cy.get(checkoutPage.title).should("have.text", "Checkout: Complete!")
            cy.get(checkoutPage.thankyouTitle).should("have.text", "THANK YOU FOR YOUR ORDER")
            cy.get(checkoutPage.thankyouText).should("have.text", "Your order has been dispatched, and will arrive just as fast as the pony can get there!")
            cy.get(checkoutPage.backButton).should("be.visible")
    
            // log out user
            inventoryPage.logout()
    
            // assert that the user is logged out
            cy.url().should("eq", "https://www.saucedemo.com/")
    })

    it("should add and remove one item from cart for standard user", () => {
        // variables
        let itemInfo = [item1.no, item1.name, item1.price]

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
        cy.get(cartPage.getItemInformation(item1.no)).should("exist")
        cy.get(cartPage.getItemName(item1.no)).should("have.text", itemInfo[1])
        cy.get(cartPage.getItemPrice(item1.no)).should("have.text", `$${itemInfo[2].toString()}`)

        // log out user
        inventoryPage.logout()

        // assert that the user is logged out
        cy.url().should("eq", "https://www.saucedemo.com/")
    })


    it("should complete a checkout flow with one item (from the product page)", () => {
        // variables
        let itemInfo = [item1.no, item1.name, item1.price]

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


        // go to product page
        inventoryPage.goToProductPage(itemInfo[0])

        // assert that the user is redirected to the product page
        cy.url().should("contain", "https://www.saucedemo.com/inventory-item")
        productPage.addToCart()

        // assert that the item is added to the cart
        cy.get(inventoryPage.cartBadge).should("be.visible")
        cy.get(inventoryPage.cartBadge).should("have.text", "1")
        

        // should go to cart
        cy.get(".shopping_cart_link").click()
        cy.url().should("eq","https://www.saucedemo.com/cart.html")

        // assert that the item is in the cart
        cy.get(cartPage.title).should("have.text", "Your Cart")
        cy.get(cartPage.getItemInformation(item1.no)).should("exist")
        cy.get(cartPage.getItemName(item1.no)).should("have.text", itemInfo[1])
        cy.get(cartPage.getItemPrice(item1.no)).should("have.text", `$${itemInfo[2].toString()}`)

        
        // should checkout successfully
        cartPage.checkout()

        // assert that the user moves on to the first step of checkout page
        cy.url().should("eq", "https://www.saucedemo.com/checkout-step-one.html")
        cy.get(checkoutPage.title).should("have.text", "Checkout: Your Information")
        cy.get(checkoutPage.firstnameInput).should("be.visible")
        cy.get(checkoutPage.lastnameInput).should("be.visible")
        cy.get(checkoutPage.continueButton).should("be.visible")

        // continue to step two
        checkoutPage.continueToStepTwo(user1.firstname, user1.lastname, user1.postal)

        // assert that the user is at step two
        cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html")
        cy.get(checkoutPage.title).should("have.text", "Checkout: Overview")

        // assert that the item selected is the same in checkout and the subtotal is correct
        cy.get(checkoutPage.checkCartItemName(1)).should("have.text", itemInfo[1])
        cy.get(checkoutPage.checkCartItemPrice(1)).should("have.text", `$${itemInfo[2]}`)
        cy.get(checkoutPage.subtotal).should("have.text", `Item total: $${itemInfo[2]}`) //confirm total cost of items before tax

        // complete checkout
        checkoutPage.completeStepTwo()

        // assert that checkout is complete
        cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html")
        cy.get(checkoutPage.title).should("have.text", "Checkout: Complete!")
        cy.get(checkoutPage.thankyouTitle).should("have.text", "THANK YOU FOR YOUR ORDER")
        cy.get(checkoutPage.thankyouText).should("have.text", "Your order has been dispatched, and will arrive just as fast as the pony can get there!")
        cy.get(checkoutPage.backButton).should("be.visible")

        // log out user
        inventoryPage.logout()

        // assert that the user is logged out
        cy.url().should("eq", "https://www.saucedemo.com/")
    })

    
    it("should add and remove one item from cart for standard user", () => {        
        // variables
        let itemInfo = [
            [item3.no, item3.name, item3.price],
            [item4.no, item4.name, item4.price],
            [item5.no, item5.name, item5.price],
        ], total = itemInfo[0][2] + itemInfo[1][2] + itemInfo[2][2]

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
        cy.get(inventoryPage.getItemInformation(item4.no)).should("be.visible") //second item
        cy.get(inventoryPage.getItemName(item4.no)).should("have.text", item4.name)
        cy.get(inventoryPage.cartButton).should("be.visible")


        // add some items to the cart
        inventoryPage.addToCart(itemInfo[0][0])
        inventoryPage.addToCart(itemInfo[1][0])
        inventoryPage.addToCart(itemInfo[2][0])

        // assert that the items are added to the cart
        cy.get(inventoryPage.cartBadge).should("be.visible")
        cy.get(inventoryPage.cartBadge).should("have.text", "3")
        

        // should go to cart
        cy.get(".shopping_cart_link").click()
        cy.url().should("eq","https://www.saucedemo.com/cart.html")

        // assert that the items are in the cart
        cy.get(cartPage.title).should("have.text", "Your Cart")
        cy.get(cartPage.getItemInformation(1)).should("exist")
        cy.get(cartPage.getItemName(1)).should("have.text", itemInfo[0][1])
        cy.get(cartPage.getItemPrice(1)).should("have.text", `$${itemInfo[0][2].toString()}`)

        cy.get(cartPage.getItemInformation(2)).should("exist")
        cy.get(cartPage.getItemName(2)).should("have.text", itemInfo[1][1])
        cy.get(cartPage.getItemPrice(2)).should("have.text", `$${itemInfo[1][2].toString()}`)

        cy.get(cartPage.getItemInformation(3)).should("exist")
        cy.get(cartPage.getItemName(3)).should("have.text", itemInfo[2][1])
        cy.get(cartPage.getItemPrice(3)).should("have.text", `$${itemInfo[2][2].toString()}`)


            // should checkout successfully
            cartPage.checkout()

            // assert that the user moves on to the first step of checkout page
            cy.url().should("eq", "https://www.saucedemo.com/checkout-step-one.html")
            cy.get(checkoutPage.title).should("have.text", "Checkout: Your Information")
            cy.get(checkoutPage.firstnameInput).should("be.visible")
            cy.get(checkoutPage.lastnameInput).should("be.visible")
            cy.get(checkoutPage.continueButton).should("be.visible")
    
            // continue to step two
            checkoutPage.continueToStepTwo(user1.firstname, user1.lastname, user1.postal)
    
            // assert that the user is at step two
            cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html")
            cy.get(checkoutPage.title).should("have.text", "Checkout: Overview")
    
            // assert that the items selected are the same in checkout and the subtotal is correct
            cy.get(checkoutPage.checkCartItemName(1)).should("have.text", itemInfo[0][1])
            cy.get(checkoutPage.checkCartItemPrice(1)).should("have.text", `$${itemInfo[0][2]}`)
            cy.get(checkoutPage.checkCartItemName(2)).should("have.text", itemInfo[1][1])
            cy.get(checkoutPage.checkCartItemPrice(2)).should("have.text", `$${itemInfo[1][2]}`)
            cy.get(checkoutPage.checkCartItemName(3)).should("have.text", itemInfo[2][1])
            cy.get(checkoutPage.checkCartItemPrice(3)).should("have.text", `$${itemInfo[2][2]}`)

            cy.get(checkoutPage.subtotal).should("have.text", `Item total: $${total}`) //confirm total cost of items before tax
    
            // complete checkout
            checkoutPage.completeStepTwo()
    
            // assert that checkout is complete
            cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html")
            cy.get(checkoutPage.title).should("have.text", "Checkout: Complete!")
            cy.get(checkoutPage.thankyouTitle).should("have.text", "THANK YOU FOR YOUR ORDER")
            cy.get(checkoutPage.thankyouText).should("have.text", "Your order has been dispatched, and will arrive just as fast as the pony can get there!")
            cy.get(checkoutPage.backButton).should("be.visible")
    
            // log out user
            inventoryPage.logout()
    
            // assert that the user is logged out
            cy.url().should("eq", "https://www.saucedemo.com/")
    })

})