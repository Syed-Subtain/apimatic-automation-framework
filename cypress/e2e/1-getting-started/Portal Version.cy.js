describe("Apimatic Portal Testing",()=>{
    Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
      });
   
    it("Should be able to iterate in different Versions of Portal Docs",()=>{
       
        cy.visit('https://developer.greenbyte.com/v/2_1#/http/how-to-get-started')
       // Validation for each Version of Portal
        cy.get('#version-select')
            .find('option')
            .each(($opn)=>{
                const optionText = $opn.text()
                const urlText = optionText.replace(/\./g,'_')
                cy.get('#version-select').select(optionText) 
                cy.url().should("include",urlText)
                //Validation of portal publishling for each available Language aginst in version
                cy.xpath('//*[@id="apimatic-widget"]/div/div/div[2]/div[1]/div/div[2]/ul').click()
                cy.get('.rc-menu.rc-menu-sub.rc-menu-vertical').find('li').its('length').then(len=>{
                cy.log(len)
                for(let k=1;k<=len;k++)
               {   cy.xpath('//*[@id="apimatic-widget"]/div/div/div[2]/div[1]/div/div[2]/ul').click({force:true})
                    cy.xpath('//*[@id="item_0$Menu"]/li['+ k +']').click({force:true})
                    cy.wait(2000)
                }   


            })
                
                  

        })
    })
    
})
