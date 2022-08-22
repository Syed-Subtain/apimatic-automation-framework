describe("Apimatic Portal Testing",()=>{
    Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
      });
   
    it("Should be able to iterate in different Versions of Portal Docs",()=>{
       
        cy.visit('https://developer.greenbyte.com/v/2_1-beta')
        cy.get('#version-select').find('option').each(($opn)=>{
            const optionText = $opn.text()
            const urlText = optionText.replace(/\./g,'_')
            cy.get('#version-select').select(optionText) 
            cy.url().should("include",urlText)
        })
        
        
        
        
        /*cy.visit('https://developer.greenbyte.com/v/2_2-beta#/http')
        cy.get('#version-select').find('option').its('length').then((len)=>{
            cy.log(len)
           for(let i=0; i<=len;i++)
            {
                let txt,result
                cy.get('#version-select').select(i).then(($sel)=>{
                    txt=$sel.text()
                    result= txt.replace('.','_')
                    cy.log($sel)
                    cy.url().should("include",txt)
                })
  
             }
        }) */



    })
})