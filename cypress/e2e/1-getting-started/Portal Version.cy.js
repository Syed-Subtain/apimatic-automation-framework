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

      it.only("Import an API using URL", () => {
        cy.visit('https://www.apimatic.io/account/login')
        cy.get('#Email').type('syed.subtain@apimatic.io')
        cy.get('#js-onboarding-password-field').type('Welcome@1')
        cy.get('.btn-primary').click()
        cy.wait(7000)
        cy.get('[ng-click="apiDashboardEventHandlers.importAPICliked()"]').contains('Import API').click();

        // }).should("have.text", "Import API")
        // cy.get('[ng-click="apiDashboardEventHandlers.importAPICliked()"] > span', {
        //   timeout: 30000,
        // }).click({ force: true });
        // cy.get('[ng-show="modalUiState.activeView == \'screen_1\'"]').find("[ng-model=importUrl]").type("https://petstore.swagger.io/v2/swagger.json")
        // cy.get('#apiImportModal').contains('Import API')
        cy.get('#apiImportModal').find('input[name="importUrl"]').type("https://petstore.swagger.io/v2/swagger.json",{force:true})
          cy.get("[class='btn btn-default']").contains('Import').click({force:true})
          cy.get('#apiImportModal').find('[ng-show="targetModal.importLoggingSumamry.success && totalValidationSummaryCount > 0"]',{timeout:5000}).click()
          cy.contains("Validation Summary");
          cy.get('button').contains('Close').click({force:true})
        //find('input[name="importUrl"]').type("https://petstore.swagger.io/v2/swagger.json");
       
        // cy.wait(2000)
        // cy.get("[class='btn btn-default']").contains('Import').click()
        // cy.xpath('//*[@id="apiImportModal"]/div/div[5]/div/div[4]/input').click({
        //   force: true,
        // });
        // cy.xpath('//*[@id="apiImportModal"]/div/div[5]/div/div[2]/div/div[1]/div[1]').contains('0')
        // cy.xpath('//*[@id="apiImportModal"]/div/div[6]/div/div[4]/button').click({
        //   force: true,
        // });
      });

})
