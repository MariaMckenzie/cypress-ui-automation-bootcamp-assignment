describe('Activity 3', () => {
    before(() => {
        //go to base url        
        cy.visit('/')
        cy.clearCookies()
    })

    it('should complete a checkout flow', () => {
        cy.get('#user-name').should('be.visible').type('standard_user')
        cy.get('#password').should('be.visible').type('secret_sauce{enter}')

        // user goes to the list of items
        cy.url().should('eq','https://www.saucedemo.com/inventory.html')
        
        //add  second item in inventory list 
        //cy.get('#inventory_container .inventory_list .inventory_item:nth-child(2) .inventory_item_description button').click()
        cy.get('#add-to-cart-sauce-labs-bike-light').click()

        //check that cart number increments
        cy.get('.shopping_cart_badge').should('be.visible');
        cy.get('.shopping_cart_badge').should('have.text', '1');

        //should go to cart
        cy.get('.shopping_cart_link').click()
        cy.url().should('eq','https://www.saucedemo.com/cart.html')

        //remove item
        //cy.get('#cart_contents_container .cart_list > div:nth-child(3) button').should('eq','Remove')
        cy.get('#remove-sauce-labs-bike-light').should('exist').click()
        
        //nothing should be in the cart / cart number does not exist
        cy.get('.shopping_cart_badge').should('not.exist');
    
    })
})
