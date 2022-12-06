
/**
* Contains the locators and selectors found on the login page. 
*/

class Login {

    /**
     * @returns the input field for the username
     */
    get usernameInput () { return ("#user-name") } 
    

    /**
     * @returns the input field for the password
     */
     get passwordInput () { return ("#password") }

    
    /**
     * @returns the button to log in
     */
     get loginButton () { return ("#login-button") }


    // METHODS

    /**
     * Logs in the user
     * @param {String} username
     * @param {String} password
     */
    login (username, password) { 
        cy.get(this.usernameInput).type(username)
        cy.get(this.passwordInput).type(password)
        cy.get(this.loginButton).click()
    }
}
export default new Login()
