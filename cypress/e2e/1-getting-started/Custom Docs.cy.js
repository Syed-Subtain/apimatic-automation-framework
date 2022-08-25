Cypress.on("uncaught:exception", (err, runnable) => {  //code to catch all uncaught exception
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
describe("Apimatic Portal Custom Docs Testing",()=>{    
    it("Custom docs must be added and shown in preview",()=>{
       cy.login()
       cy.get(':nth-child(1) > .api-card > [ng-show="!apiGroupCardUIState.loading "] > .api-body > .team-button-div > .btn-generate').click()
       cy.wait(4000)
       cy.xpath('/html/body/div[1]/div/div/code-gen/div/div[3]/ng-form/div[2]/a').contains('Proceed').click({force: true})
       cy.xpath('/html/body/div[1]/div/div/code-gen/div/div[7]/ng-form/div[2]/div/api-portal-options/div[2]/div/a').invoke('removeAttr', 'target').click() //generating docs page
       
       cy.get('.btn.btn-customize').invoke('removeAttr', 'target').click()
       cy.xpath('/html/body/div[1]/div[1]/div/div/div[2]/div/div[2]/div[5]/div/div[2]/div/div[2]/div/div/div[1]/div[2]/div/button').click({force: true})
       cy.xpath('/html/body/div[1]/div[1]/div/div/div[2]/div/div[2]/div[5]/div/div[2]/div/div[2]/div/div/div[1]/div[2]/div/ul/div[1]/li/a/div[2]').click() //creating new customs docs page
       const random  = Math.floor(Math.random() * 10)
       const pageName = "Test"+ random
       const slug = "testingslug"+random 
       
       cy.get(':nth-child(1) > .flex-col > .h-8').type(pageName)
        cy.get('.relative > .flex-col > .h-8').type(slug)
        cy.get('.z-10 > .justify-between > :nth-child(2)').click({force: true})
        cy.get('.toastui-editor.md-mode').type("This is a testing mark down please Ignore.")//Entering text in markdown page
        cy.get('#save-action-portal > .tooltip > .tooltip-trigger > .button-wrapper').click()//click on save button to save markdown text
        cy.window().then((win) => { //stubing the window to open preview Url in same Tab
            cy.stub(win, "open")
              .callsFake((url) => {
                return win.open.wrappedMethod.call(win, url, "_self");
              })
              .as("open");
          });
          cy.get("a").contains("Preview").click();
          cy.get("@open").should("have.been.calledWithMatch","https://www.apimatic.io/api-docs-preview/portal-editor/");
          cy.get('.btn-get-started').click()
          cy.log(pageName)
          cy.get('.rc-menu-item-group-list').find('li').contains(pageName).click();
          cy.xpath("/html/body/div/div[2]/div/div/div/div[2]/div[2]/div[1]/div/div/div[2]/p").contains("This is a testing mark down please Ignore.")


    })
})