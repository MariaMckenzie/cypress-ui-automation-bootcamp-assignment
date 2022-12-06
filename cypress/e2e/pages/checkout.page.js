
/**
* Contains the locators and selectors found on the checkout page. 
*/

class Checkout {
    
    /**
     * @returns the checkout title
     */
    get title () { return (".header_secondary_container .title") }

    
    /**
     * @returns the input field for the user's firstname
     */
    get firstnameInput () { return ("#first-name") }

    
    /**
     * @returns the input field for the user's lastname
     */
    get lastnameInput () { return ("#last-name") }


    /**
     * @returns the input field for the user's postal code 
     */
    get postalCodeInput () { return ("#postal-code") }

         
    /**
     * @returns an error message for missing data
     */
    get errorMessage () { return (".error-message-container.error h3") }


    /**
     * @returns proceed with checkout button
     */
    get continueButton () { return ("#continue") }


    /**
     * @returns the subtotal
     */
    get subtotal () { return (".summary_info .summary_subtotal_label") }


    /**
     * @returns finish checkout button
     */
    get finishCheckoutButton () { return ("#finish") }


    /**
     * @returns title for thank you page
     */
    get thankyouTitle () { return (".complete-header") }


    /**
     * @returns text on the thank you page -
     */
    get thankyouText () { return (".complete-text") }


    /**
     * @returns back to products button
     */
    get backButton () { return ("#back-to-products") }


    /**
     * @returns the product in the checkout page
     */
    get itemsList () { return (".cart_list") }


    // METHODS   

    /**
     * Continue to step two of checkout process
     * @param {String} firstname
     * @param {String} lastname
     * @param {String} postalcode
     */
    continueToStepTwo (firstname, lastname, postalcode) {
        if (firstname === '' & lastname === '' &  postalcode === '') {            
            cy.get(this.continueButton).click()
        } else if  (firstname === '') {
            cy.get(this.lastnameInput).type(lastname)
            cy.get(this.postalCodeInput).type(postalcode)
            cy.get(this.continueButton).click()
        } else if  (lastname === '') {
            cy.get(this.firstnameInput).type(firstname)
            cy.get(this.postalCodeInput).type(postalcode)
            cy.get(this.continueButton).click()
        } else if  (postalcode === '') {
            cy.get(this.firstnameInput).type(firstname)
            cy.get(this.lastnameInput).type(lastname)
            cy.get(this.continueButton).click()
        } else {
            cy.get(this.firstnameInput).type(firstname)
            cy.get(this.lastnameInput).type(lastname)
            cy.get(this.postalCodeInput).type(postalcode)
            cy.get(this.continueButton).click()
        }
    }


    /**
     * Clear form fields
     */
    clearForm () {        
        cy.get(this.firstnameInput).clear()
        cy.get(this.lastnameInput).clear()
        cy.get(this.postalCodeInput).clear()
    }

    /**
     * Proceeds to the next step of the checkout process
     */
    completeStepTwo () {
        cy.get(this.finishCheckoutButton).click()
    }


    /**
     * @param {Number} itemNo
     * @returns the name of the nth item on the list
     */
     checkCartItemName (itemNo) {
        return `${this.itemsList}> :nth-child(${itemNo+2}) .inventory_item_name`
    }


    /**
     * @param {Number} itemNo
     * @returns the price of the nth item on the list
     */
     checkCartItemPrice (itemNo) {
        return `${this.itemsList}> :nth-child(${itemNo+2}) .inventory_item_price`
    }


}
export default new Checkout()
