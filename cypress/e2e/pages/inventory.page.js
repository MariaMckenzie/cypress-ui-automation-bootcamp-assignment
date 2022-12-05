
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
     * @returns the sort dropdown selection
     */
     get sortSelection () { return ("select .product_sort_container") }

    
    /**
     * @returns option 1 in the dropdown (a-z)
     */
     get azNameOption () { return (".product_sort_container > option[value='az']") }


    /**
     * @returns option 2 in the dropdown (z-a)
     */
     get zaNameOption () { return (".product_sort_container > option[value='za']") }


    /**
     * @returns option 3 in the dropdown (low - high)
     */
     get ascendingPriceOption () { return (".product_sort_container > option[value='lohi']") }


    /**
     * @returns option 4 in the dropdown (high - low)
     */
     get descendingPriceOption () { return (".product_sort_container > option[value='hilo']") }


    // METHODS
     
    /**
     * @args username: String, password: String
     * @returns the input field for the password
     */
    logout () { 
        cy.get(this.usernameInput).type(username)
        cy.get(this.passwordInput).type(password)
        cy.get(this.loginButton).click()
    }

    /**
     * @route to the inventory page
     */
    route () {
        cy.visit("/inventory.html")
    }
}
export default new Inventory()
