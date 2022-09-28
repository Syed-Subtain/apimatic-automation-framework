describe("Apimatic Portal Custom Docs Testing",()=>{    
    it("Custom docs must be added and shown in preview",()=>{
        //cy.visit('https://apidocs.peoplehedge.net/v/1_0_2-beta_1.html#/php/how-to-get-started')
        //cy.get('.btn-get-started').click()
       // cy.get('.rc-menu-submenu.rc-menu-submenu-horizontal.rc-menu-submenu-selected').find('.rc-menu-submenu-arrow').click()
      /* cy.get('body').then((body) => {
       if(cy.wrap(body).find('button').contains('Get SDK').length > 0)
        { cy.get('button').contains('Get SDK').click()}
       })
       cy.get('button').contains('Get SDK')
  .should((_) => {})
  .then(($button) => {
    if (!$button.length) {
     // there is no button
      cy.log('there is no button')}
    else
      cy.wrap($button).click()
    })*/
    cy.visit('https://app-apimaticio-test-eus.azurewebsites.net/Account/Login')
    cy.get('#Email').type('syed.subtain@apimatic.io')
    cy.get('#js-onboarding-password-field').type('Welcome@1')
    cy.get('.btn-primary').click()
    cy.get('[ng-controller="apiGroupCardV3Controller"]').should('contain','Swagger Petstore').then(($var)=>
    {
      cy.wrap($var).find('[ng-click ="apiGroupClickEventHandlers.codeGenClicked()"]').click()
    })//.should('have.text','Swagger Petstore')//.click({force: true})
    cy.wait(4000)
    })
})