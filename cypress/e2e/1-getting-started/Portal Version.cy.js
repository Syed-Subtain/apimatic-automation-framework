import { testUrls } from '../../support/portalurl.js'; //importing Urls from a folder
Cypress.on("uncaught:exception", (err, runnable) => {  //code to catch all uncaught exception
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
describe("Apimatic Portal Testing",()=>{    
      testUrls.forEach((url)=>{
    it("Should be able to iterate in different Versions of Portal Docs",()=>{
        cy.visit(url)
        cy.get('body').then($Body=>
            {
                 if($Body.find('.btn-get-started').length)
                 cy.get('.btn-get-started').click()

                cy.get('#version-select').should((_) => {})
                .then(($VS) => {
                  if ($VS.length>0) {
                   // there is no button
                  cy.versionTest() 
                  } else
                 cy.languageTest() 
                  })
            })
      

        })
                
      })          

      it("Import an API using URL", () => {
        cy.visit('https://www.apimatic.io/account/login')
        cy.get('#Email').type('syed.subtain@apimatic.io')
        cy.get('#js-onboarding-password-field').type('Welcome@1')
        cy.get('.btn-primary').click()
        cy.wait(7000)
        //click on import API button
        cy.get('[ng-click="apiDashboardEventHandlers.importAPICliked()"]').contains('Import API').click();
        //Adding URL of spec
        cy.get('#apiImportModal').find('input[name="importUrl"]').type("https://petstore.swagger.io/v2/swagger.json",{force:true})
        //clicking on Import button  
        cy.get("[class='btn btn-default']").contains('Import').click({force:true})
        //click on proceed button
          cy.get('#apiImportModal').find('[ng-show="targetModal.importLoggingSumamry.success && totalValidationSummaryCount > 0"]',{timeout:5000}).click()
          cy.contains("Validation Summary");
          //click on close button      
          cy.get('button').contains('Close').click({force:true})
        
      });


})
