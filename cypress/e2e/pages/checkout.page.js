
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



    // METHODS   

    /**
     * Continue to step two of checkout process
     * @param {String} firstname
     * @param {String} lastname
     * @param {String} postalcode
     */
    continueToStepTwo (firstname, lastname, postalcode) {
        cy.get(this.firstnameInput).type(firstname)
        cy.get(this.lastnameInput).type(lastname)
        cy.get(this.postalCodeInput).type(postalcode)
        cy.get(this.continueButton).click()
    }

    completeStepTwo () {
        cy.get(this.finishCheckoutButton).click()
    }


}
export default new Checkout()
