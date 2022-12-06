
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
     * Add the nth item to cart 
     * @param {Number} itemNo nth item in the list
     */
     addToCart (itemNo) {
        cy.get(`${this.productList} > div:nth-child(${itemNo}) ${this.addToCartButton}`).click()
    }
    
    
    /**
     * Get the item name for the nth item
     * @param {Number} itemNo nth item in the list
     */
     getItemName (itemNo) {
        return cy.get(`${this.productList} > div:nth-child(${itemNo}) ${this.itemName}`).val()
    }
    
    
    /**
     * Get the item description for the nth item
     * @param {Number} itemNo nth item in the list
     */
    getItemDescription (itemNo) {
        return cy.get(`${this.productList} > div:nth-child(${itemNo}) ${this.itemDescription}`).val()
    }
    
    
    /**
     * Get the item price for the nth item
     * @param {Number} itemNo nth item in the list
     */
    getItemPrice (itemNo) {
        return cy.get(`${this.productList} > div:nth-child(${itemNo}) ${this.itemPrice}`).val()
    }

}
export default new Product()
