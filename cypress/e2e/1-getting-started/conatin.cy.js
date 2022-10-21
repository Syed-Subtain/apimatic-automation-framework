describe("Apimatic Portal Custom Docs Testing",()=>{    
    it("Custom docs must be added and shown in preview",()=>{
    cy.visit('https://www.apimatic.io/apidocs/testswagger/v/1_0_6#/http/api-endpoints/pet/update-pet-with-form')
    //cy.ValidateStringParam()
     cy.get('.rjsf-field-string').then(($var)=>{
        if($var.length>0)
        cy.ValidateStringParam()

     })
   
    })
})