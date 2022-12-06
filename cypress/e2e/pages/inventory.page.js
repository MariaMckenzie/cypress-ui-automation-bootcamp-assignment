
/**
* Contains the locators and selectors found on the inventory page. 
*/

class Inventory {

    /**
     * @returns the menu button that displays the sidebar
     */
    get menuButton () { return ("#react-burger-menu-btn") } 
    

    /**
     * @returns the logout button
     */
     get logoutButton () { return ("#logout_sidebar_link") }


    /**
     * @returns the cart button
     */
    get cartButton () { return (".shopping_cart_link") }


    /**
     * @returns the cart badge
     */
    get cartBadge () { return (".shopping_cart_badge") }

    
    /**
     * @returns the sort dropdown selection
     */
    get sortSelection () { return ("[data-test='product_sort_container']") }

    
    /**
     * @returns inventory list 
     */
    get inventoryList () { return (".inventory_list") }


    /**
     * @returns inventory items 
     */
    get inventoryListItems () { return (".inventory_list > div") }

    
    /**
     * @returns inventory item image
     */
    get itemImage () { return (".inventory_item_img") }
    

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
    get itemPrice () { return (".pricebar .inventory_item_price") }


    /**
     * @returns add to cart button
     */
    get addOrRemoveButton () { return (".pricebar button") }

   
    // METHODS
     
    /**
     * Logs out user
     */
    logout () { 
        cy.get(this.menuButton).click()
        cy.get(this.logoutButton).click()
    }


    /**
     * Adds an item to cart
     * @param {Number} itemNo nth item in the list
     */
     addToCart (itemNo) {
        cy.get(`${this.inventoryListItems}:nth-child(${itemNo}) ${this.addOrRemoveButton}`).click()
    }


    /**
     * Remove an item from cart
     * @param {Number} itemNo nth item in the list
     */
    removeFromCart (itemNo) {
        cy.get(`${this.inventoryListItems}:nth-child(${itemNo}) ${this.addOrRemoveButton}`).click()
    }

    
    /**
     * Goes to the product page of the selected item
     * @param {Number} itemNo nth item in the list
     */
    goToProductPage (itemNo) {
        cy.get(`${this.inventoryListItems}:nth-child(${itemNo}) ${this.itemName}`).click()
    }
    
    
    /**
     * @param {Number} itemNo nth item in the list
     * @returns the item description container for a single item
     */
    getItemInformation (itemNo) {
        return `${this.inventoryListItems}:nth-child(${itemNo})`
    }

    
    /**
     * @param {Number} itemNo nth item in the list
     * @returns the name of the item
     */
     getItemName (itemNo) {
        return `${this.inventoryListItems}:nth-child(${itemNo}) ${this.itemName}`
    }
    
    
    /**
     * @param {Number} itemNo nth item in the list
     * @returns the description of the item
     */
    getItemDescription (itemNo) {
        return `${this.inventoryListItems}:nth-child(${itemNo}) ${this.itemDescription}`
    }
    
    
    /**
     * @param {Number} itemNo nth item in the list
     * @returns the price of the item
     */
    getItemPrice (itemNo) {
        return `${this.inventoryListItems}:nth-child(${itemNo}) ${this.itemPrice}`
    }


    /**
     * Sort by name in ascending order
     */
    azSort () {
        cy.get(this.sortSelection).select(0)
    }


    /**
     * Sort by name in descending order
     */
    zaSort () {
        cy.get(this.sortSelection).select(1)
    }

    /**
     * Sort by price in ascending order
     */
    lohiSort () {
        cy.get(this.sortSelection).select(2)
    }


    /**
     * Sort by price in descending order
     */
    hiloSort () {
        cy.get(this.sortSelection).select(3)
    }

}
export default new Inventory()
