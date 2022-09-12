describe("Apimatic Portal Custom Docs Testing",()=>{    
    it("Custom docs must be added and shown in preview",()=>{
        cy.visit('https://apidocs.peoplehedge.net/v/1_0_2-beta_1.html#/php/how-to-get-started')
        //cy.get('.btn-get-started').click()
       // cy.get('.rc-menu-submenu.rc-menu-submenu-horizontal.rc-menu-submenu-selected').find('.rc-menu-submenu-arrow').click()
      /* cy.get('body').then((body) => {
       if(cy.wrap(body).find('button').contains('Get SDK').length > 0)
        { cy.get('button').contains('Get SDK').click()}
       })*/
       cy.get('button').contains('Get SDK')
  .should((_) => {})
  .then(($button) => {
    if (!$button.length) {
     // there is no button
      cy.log('there is no button')}
    else
      cy.wrap($button).click()
    })
    })
})