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
        var flag
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
               /* if($Body.find('#version-select').length >0)
                { var flag =true
                }
                else flag = false
              })
         
        //var flag = cy.ifElementExist()
        cy.log(flag)
        if(flag)
        {           cy.versionTest() //custom command to test all portal versions
                }
        else{
                    cy.languageTest() //custom command to test all the languages 

                }*/
            })
      

        })
                
      })          

})
