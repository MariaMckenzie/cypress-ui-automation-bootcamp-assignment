import loginPage from "../../pages/login.page"
import inventoryPage from "../../pages/inventory.page"
import { problemUser } from "../../data/login.data"
import { item1, item2, item3, item4, item5, item6 } from "../../data/products.data"

describe("Sort as a problem user", () => {
    // variables
    let itemsLst = [
        [item1.name, item1.price], [item2.name, item2.price],
        [item3.name, item3.price], [item4.name, item4.price],
        [item5.name, item5.price], [item6.name, item6.price]
    ]

    beforeEach(() => {
        //go to base url        
        cy.visit("/")

        cy.clearCookies()

        // login with a valid user
        loginPage.login(problemUser.username, problemUser.password)

        // assert that the user logs in successfully and can see the inventory page, inventory items and cart button
        cy.url().should("eq","https://www.saucedemo.com/inventory.html")
        cy.get(inventoryPage.getItemInformation(item1.no)).should("be.visible") //first item
        cy.get(inventoryPage.getItemName(item1.no)).should("have.text", item1.name)
        cy.get(inventoryPage.cartButton).should("be.visible")

    })


    afterEach(() => {
        // log out user
        inventoryPage.logout()
        
        // assert that the user is logged out
        cy.url().should("eq", "https://www.saucedemo.com/")
    })


    /**
     * According to the saucedemo.com source code [view in Dev Tools > Sources > static > js > pages > inventory.jsx (lines 38-43)],
     * for a performance glitch user the page should be visible after 5 seconds. The code snippet is as follows:
     *      // istanbul ignore next 
            const sortByOption = (event) => {
                if (isProblemUser()) {
                // Bail out now if we're problem user so that we have a behaviour which is broken in Chrome only for sort.
                // select option onclick is not supported in Chrome but works in IE and FF
                    return;
    */
    it("Should keep default sort by name in ascending order", () => {
        // sort by name in ascending order
        cy.get(inventoryPage.sortSelection).select(0)
        itemsLst.sort(function(a, b){ return a[0].localeCompare(b[0]) }) // sort items list

        // assert that the items are not sorted - default sorting remains
        cy.get(inventoryPage.getItemName(1)).should("have.text", itemsLst[0][0])
        cy.get(inventoryPage.getItemName(3)).should("have.text", itemsLst[2][0])
        cy.get(inventoryPage.getItemName(6)).should("have.text", itemsLst[5][0])
    })


    it("Should not sort by name in descending order", () => {        
    // sort by name in descending order
    inventoryPage.zaSort()
    itemsLst.sort(function(a, b){ return b[0].localeCompare(a[0]) }) // sort items list

        // assert that the items are not sorted
        cy.get(inventoryPage.getItemName(1)).should("not.have.text", itemsLst[0][0])
        cy.get(inventoryPage.getItemName(3)).should("not.have.text", itemsLst[2][0])
        cy.get(inventoryPage.getItemName(6)).should("not.have.text", itemsLst[5][0])
    })


    it("Should not sort by price in ascending order", () => {        
        // sort by price in ascending order
        inventoryPage.lohiSort()
        itemsLst.sort(function(a, b){ 
            if (a[1] === b[1]) {
                return a[0].localeCompare(b[0])
            } return a[1] - b[1]             
        }) // sort items list
    
        // assert that the items are not sorted
        cy.get(inventoryPage.getItemName(1)).should("not.have.text", itemsLst[0][0])
        cy.get(inventoryPage.getItemName(4)).should("not.have.text", itemsLst[3][0])
        cy.get(inventoryPage.getItemName(6)).should("not.have.text", itemsLst[5][0])
    })


    it("Should not sort by price in descending order", () => {        
        // sort by price in descending order
        inventoryPage.hiloSort()
        itemsLst.sort(function(a, b){ 
            if (a[1] === b[1]) {
                return a[0].localeCompare(b[0])
            } return b[1] - a[1]             
        }) // sort items list
    
        // assert that the items are not sorted
        cy.get(inventoryPage.getItemName(1)).should("not.have.text", itemsLst[0][0])
        cy.get(inventoryPage.getItemName(4)).should("not.have.text", itemsLst[3][0])
        cy.get(inventoryPage.getItemName(6)).should("not.have.text", itemsLst[5][0])
    })

})
