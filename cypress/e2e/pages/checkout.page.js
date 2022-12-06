
/**
* Contains the locators and selectors found on the checkout page. 
*/

class Checkout {
    
    /**
     * @returns the checkout title -- "Checkout: Your Information"
     */
    get title () { return (".header_secondary_container .title") }

    
    /**
     * @returns 
     */
    get checkoutList () { return ("#first-name") }

    
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
     * @returns add to checkout button
     */
    get removeButton () { return (".item_pricebar button") }


    /**
     * @returns checkout button
     */
     get checkoutButton () { return ("#checkout") }


    /**
     * @returns continue shopping button
     */
    get checkoutButton () { return ("#continue-shopping") }

   

    // METHODS   

    /**
     * Checkout items in the checkout 
     */
    checkout () {       
        cy.get(this.checkoutButton).click()
    }


    /**
     * Remove the nth item to checkout 
     * @param {Number} itemNo nth item in the list
     */
    removeFromcheckout (itemNo) {
        cy.get(`${this.checkoutList}:nth-child(${itemNo+2}) ${this.removeButton}`).click()
    }

    
    /**
     * @param {Number} itemNo nth item in the list
     * @returns the item description container for the nth item in the checkout
     */
     getItemInformation (itemNo) {
        return `${this.checkoutList}:nth-child(${itemNo+2})`
    }


    /**
     * @returns the item description container for the last item in the checkout
     */
    getLastItemInformation () {
        return `${this.checkoutList}:last-child()`
    }
    

    /**
     * Get the item name for the nth item
     * @param {Number} itemNo nth item in the list
     */
    getItemName (itemNo) {
        return (`${this.checkoutList}:nth-child(${itemNo+2}) ${this.itemName}`)
    }
    
    
    /**
     * Get the item description for the nth item
     * @param {Number} itemNo nth item in the list
     */
    getItemDescription (itemNo) {
        return (`${this.checkoutList}:nth-child(${itemNo+2}) ${this.itemDescription}`)
    }
    
    
    /**
     * Get the item price for the nth item
     * @param {Number} itemNo nth item in the list
     */
    getItemPrice (itemNo) {
        return (`${this.checkoutList}:nth-child(${itemNo+2}) ${this.itemPrice}`)
    }

}
export default new Checkout()
