
/**
* Contains the locators and selectors found on the product page. 
*/

class Product {
    
    /**
     * @returns the cart button
     */
    get cartButton () { return (".shopping_cart_link") }

    
    /**
     * @returns product information container
     */
    get productList () { return (".inventory_details_img_container") }

    
    /**
     * @returns product item image
     */
    get itemImage () { return (".inventory_details_img") }
    

    /**
     * @returns item name
     */
    get itemName () { return (".inventory_details_name .large_size") }


    /**
     * @returns item description
     */
    get itemDescription () { return (".inventory_details_desc.large_size") }

         
    /**
     * @returns item price
     */
    get itemPrice () { return (".inventory_details_price") }


    /**
     * @returns add to cart button
     */
    get addOrRemoveButton () { return (".inventory_details_desc_container button") }

   
    // METHODS    

    /**
     * Add product to cart 
     */
    addToCart () {
        cy.get(this.addOrRemoveButton).click()
    }


    /**
     * Remove product from cart
     */
    removeFromCart () {
        cy.get(this.addOrRemoveButton).click()
    }

    /**
     * Go back to inventory
     */
    goToInventory () {
        cy.get("#back-to-products").click()
    }
    
}
export default new Product()
