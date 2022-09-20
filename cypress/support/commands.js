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
Cypress.Commands.add('versionTest', () => {
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
})

Cypress.Commands.add('languageTest', () => {
    cy.wait(2000)
    cy.xpath('//*[@id="apimatic-widget"]/div/div/div[2]/div[1]/div/div[2]/ul').click() //click to open drop down
    cy.get('.rc-menu.rc-menu-sub.rc-menu-vertical').find('li').its('length').then(len=>{ // find length of all available list items in drop down
    cy.log(len)
    for(let k=1;k<=len;k++)
   {   cy.xpath('//*[@id="apimatic-widget"]/div/div/div[2]/div[1]/div/div[2]/ul').click({force:true})//click to open dropdown
        cy.xpath('//*[@id="item_0$Menu"]/li['+ k +']').click({force:true})//clicking each element in dropdown items
        cy.wait(2000)
        cy.get('button').contains('Get SDK')//clicking on Get SDK button if available
            .should((_) => {})
            .then(($button) => {
        if (!$button.length) {
         // there is no button
         cy.log('there is no button')}
        else
       {  cy.wrap($button).click({force: true})
         //cy.verifyDownload('.zip', { contains: true })
      /*  cy.intercept("GET","/api/api-entities/**").as('DownloadCall')
        cy.wait('@DownloadCall').then(({response}) => {
            expect(response.statusCode).to.eq(200)
           }) */
            cy.intercept("GET", "/api/api-entities/**").as("SDK");
            cy.wait("@SDK").then((intercept) => {
                const { statusCode } = intercept.response;
                // confirm the status code is 200
                expect(statusCode).to.eq(200);
            });
        
        }
         cy.wait(3000)

         
    })
    }
    })
})

Cypress.Commands.add( 'ifElementExist',() =>{
    
        cy.get('body').then($Body=>
            {
                try {
                if($Body.find('.version-select'))
                return true
                }catch(error) {
                    return false
                }
            })

})

Cypress.Commands.add( 'login',() =>{
    
    cy.visit('https://www.apimatic.io/')
    cy.get('.mobmenu-right-bt > img').click()
    cy.get('.menu-item-33390 > a').click()
    cy.get('#Email').type('syed.subtain@apimatic.io')
    cy.get('#js-onboarding-password-field').type('Welcome@1')
    cy.get('.btn-primary').click()
})

require('cy-verify-downloads').addCustomCommand();
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })