//const urls = ['https://developer.commandalkon.io/v/2_0_0', 'https://www.apimatic.io/apidocs/ocxfulfillmentservices/v/1_2_0','https://www.chargelogic.com/connect/developer/']
import { testUrls } from '../../support/portalurl.js';
Cypress.on("uncaught:exception", (err, runnable) => {
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
                if($Body.find('version-select'))
                {
                    cy.versionTest()
                }
                else{
                    cy.languageTest()

                }
            })
      

        })
                
                  

    })
})
