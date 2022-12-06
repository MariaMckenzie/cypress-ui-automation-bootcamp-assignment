
/**
* Contains the locators and selectors found on the cart page. 
*/

class Cart {
    
    /**
     * @returns the cart title
     */
    get title () { return (".header_secondary_container .title") }

    
    /**
     * @returns the cart items
     */
    get cartList () { return (".cart_list .cart_item") }

    
    /**
     * @returns item name
     */
    get itemName () { return (".inventory_item_name") }


    /**
     * @returns item description
     */
    get itemDescription () { return (".inventory_item_desc") }

         
    /**
     * @returns item price
     */
    get itemPrice () { return (".inventory_item_price") }


    /**
     * @returns add to cart button
     */
    get removeButton () { return (".item_pricebar button") }


    /**
     * @returns checkout button
     */
     get checkoutButton () { return ("#checkout") }


    /**
     * @returns continue shopping button
     */
    get continueShoppingButton () { return ("#continue-shopping") }

   

    // METHODS   

    /**
     * Checkout items in the cart 
     */
    checkout () {       
        cy.get(this.checkoutButton).click()
    }


    /**
     * Remove the nth item to cart 
     * @param {Number} itemNo nth item in the list
     */
    removeFromCart (itemNo) {
        cy.get(`${this.cartList}:nth-child(${itemNo+2}) ${this.removeButton}`).click()
    }

    
    /**
     * @param {Number} itemNo nth item in the list
     * @returns the item description container for the nth item in the cart
     */
     getItemInformation (itemNo) {
        return `${this.cartList}:nth-child(${itemNo+2})`
    }


    /**
     * @returns the item description container for the last item in the cart
     */
    getLastItemInformation () {
        return `${this.cartList}:last-child()`
    }
    

    /**
     * Get the item name for the nth item
     * @param {Number} itemNo nth item in the list
     */
    getItemName (itemNo) {
        return (`${this.cartList}:nth-child(${itemNo+2}) ${this.itemName}`)
    }
    
    
    /**
     * Get the item description for the nth item
     * @param {Number} itemNo nth item in the list
     */
    getItemDescription (itemNo) {
        return (`${this.cartList}:nth-child(${itemNo+2}) ${this.itemDescription}`)
    }
    
    
    /**
     * Get the item price for the nth item
     * @param {Number} itemNo nth item in the list
     */
    getItemPrice (itemNo) {
        return (`${this.cartList}:nth-child(${itemNo+2}) ${this.itemPrice}`)
    }

}
export default new Cart()
