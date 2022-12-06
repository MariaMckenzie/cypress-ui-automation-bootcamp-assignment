# Cypress UI Automation Bootcamp Assignment
Author: Maria McKenzie


 ## Dependencies
1. NodeJS v12, v14 or above
3. NPM v6 or above

## Getting Started
Clone the repository & install dependencies
```sh
$ git clone 
$ cd cypress-ui-automation-bootcamp-assignment
$ npm install
```
# Folder Structure
- **cypress/e2e/pages:** Page object files which include element selectors and functions that are used in tests.
- **cypress/e2e/tests:** Test files which include the actual tests.
- **cypress/e2e/data:** Data files used in data-driven tests.

# Execute tests
Execute the Cypress GUI

```npm run cypress:open```

Execute the Cypress via commandline

```npm run cypress:run```

Executes all tests in the Chrome browser and generates a Mochawesome report.

```npm test``` 

# Execute tests in a different browser
```npm cypress:run --browser firefox```

***N.B. The browser must be installed on the device.***

# Execute a specific test file

Without Report

```npm run cypress:spec cypress/e2e/test/InClassActivities/activity4.cy.js```

OR

With Report

```npm run test:spec cypress/e2e/test/InClassActivities/activity4.cy.js```
