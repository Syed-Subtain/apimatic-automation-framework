// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
const Email = "syed.subtain@apimatic.io"
    const Password = "Welcome@1"
Cypress.Commands.addAll({versionTest() {
    cy.get('#version-select')
            .find('option')//finding all the avilable version in dropdown
            .each(($opn)=>{
                const optionText = $opn.text()
                const urlText = optionText.replace(/\./g,'_') // replacing '.' with '_' in version text
                cy.get('#version-select').select(optionText) //selecting the version on the abse of text
                cy.url().should("include",urlText) // aserting the URL to include Version text
                cy.log(optionText)
                cy.languageTest()
            })
},

languageTest() {
    cy.wait(4000)
    cy.xpath('//*[@id="apimatic-widget"]/div/div/div[2]/div[1]/div/div[2]/ul').click() //click to open drop down
    cy.get('.rc-menu.rc-menu-sub.rc-menu-vertical').find('li').its('length').then(len=>{ // find length of all available list items in drop down
    cy.log(len)
    for(let k=1;k<=len;k++)
   {   cy.xpath('//*[@id="apimatic-widget"]/div/div/div[2]/div[1]/div/div[2]/ul').click({force:true})//click to open dropdown
        cy.xpath('//*[@id="item_0$Menu"]/li['+ k +']').click({force:true})//clicking each element in dropdown items
        cy.wait(4000)
        
        cy.get('button').contains('Get SDK')//clicking on Get SDK button if available
            .should((_) => {})
            .then(($button) => {
        if (!$button.length) {
         // If get SDK isn't enabled for a language
         cy.log('there is no button')}
        else
       {
       
        cy.url().then((url) => {
            
            if (url.includes('api-docs-preview')) {
              // If its a preview portal 
              cy.getSDKPreview($button)
            }
              else
              cy.getSDK($button)
        })

    } 
    })
    }
    })
},

ifElementExist(){
    
        cy.get('body').then($Body=>
            {
                try {
                if($Body.find('.version-select'))
                return true
                }catch(error) {
                    return false
                }
            })

},
getSDK(button){
    
    cy.intercept("GET", "/api/api-entities/**").as("SDK");  
        cy.wrap(button).click()
        cy.wait('@SDK').then(({response}) => {
            expect(response.statusCode).to.eq(200)
           }) 

},
getSDKPreview(button){
    
    cy.intercept("GET", "https://www.apimatic.io/api/codegen?**").as("SDK");  
        cy.wrap(button).click()
        cy.wait('@SDK').then(({response}) => {
            expect(response.statusCode).to.eq(200)
           }) 

},

login(){  
    
    cy.session([Email,Password],()=>{
        cy.visit('/')
        cy.get('#Email').type(Email)
          cy.get('#js-onboarding-password-field').type(Password)
          cy.get('.btn-primary').click()
          cy.wait(500)
          cy.url().should('include','dashboard')
      })       
},
ValidateStringParam(){  
    cy.log('test')
    cy.get('.rjsf-field-string').each(($Ele)=>{
        // var type =""
        // cy.wrap($Ele).find('.rjsf-base-type').then(($var)=>{
        //     type=$var.text()
        //     cy.log(type)
        // })
        const type=$Ele.text()
        cy.log(type)
          if(type === 'String'){
          const result = Math.random().toString(36).substring(2,7)
          cy.wrap($Ele).find('input[type="text"]').type(result).should('have.text',result)
          }
    })    
},
})
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })