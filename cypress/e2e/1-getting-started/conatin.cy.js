describe("Apimatic Portal Custom Docs Testing",()=>{    
    it("Custom docs must be added and shown in preview",()=>{
        cy.visit('https://www.apimatic.io/api-docs/anno-ai/')
        cy.get('.btn-get-started').click()
        cy.get('.rc-menu-submenu.rc-menu-submenu-horizontal.rc-menu-submenu-selected').find('.rc-menu-submenu-arrow').click()
    })
})