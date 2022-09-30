import 'cypress-wait-until';

Cypress.on("uncaught:exception", (err, runnable) => {  //code to catch all uncaught exception
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
describe("Apimatic Portal Custom Docs Testing",()=>{    
    it("Custom docs must be added and shown in preview",()=>{
       //cy.login()
       cy.visit('https://app-apimaticio-test-eus.azurewebsites.net/Account/Login')
       cy.get('#Email').type('syed.subtain@apimatic.io')
       cy.get('#js-onboarding-password-field').type('Welcome@1')
       cy.get('.btn-primary').click()
       cy.get(':nth-child(1) > .api-card > [ng-show="!apiGroupCardUIState.loading "] > .api-body > .team-button-div > .btn-generate').click({force: true})
       cy.wait(4000)
       cy.waitUntil(()=>cy.xpath('/html/body/div[1]/div/div/code-gen/div/div[3]/ng-form/div[2]/a').contains('Proceed').then(($ele)=>{
        cy.wrap($ele).click()
       }))
       cy.xpath('/html/body/div[1]/div/div/code-gen/div/div[7]/ng-form/div[2]/div/api-portal-options/div[2]/div/a').invoke('removeAttr', 'target').click({force: true}) //generating docs page
       
       cy.get('.btn.btn-customize').invoke('removeAttr', 'target').click()
       
       const random  = Math.random()
       for(let i=random; i<random+2;i++)
       {
        cy.xpath('/html/body/div[1]/div[1]/div/div/div[2]/div/div[2]/div[5]/div/div[2]/div/div[2]/div/div/div[1]/div[2]/div/button').click({force: true})
      
        cy.get('.item-text').contains('Add Section').click()
        const sectionName = "Sec"+ i
    
      
        cy.get('input[name="name"]').type(sectionName)
        cy.get('button').contains('Done').click({force: true})
        cy.wait(2000)
        
       cy.get('button').contains('Save').click()
        for(let j=random;j<random+2;j++)
        {
            cy.xpath('/html/body/div[1]/div[1]/div/div/div[2]/div/div[2]/div[5]/div/div[2]/div/div[2]/div/div/div[2]/div[1]/div/div[1]/div[1]/div[2]/div/button').click({force: true})
            cy.get('.item-text').contains('Add Page').click()

            const pageName = "Page"+ j
           
            cy.get('input[name="name"]').type(pageName) 
            
            cy.get('button').contains('Done').click()
            cy.get('.toastui-editor.md-mode').type("This is "+sectionName+"and"+pageName)//Entering text in markdown page
          
          cy.get('button').contains('Save').click()
        }
    
    
    }

        cy.window().then((win) => { //stubing the window to open preview Url in same Tab
            cy.stub(win, "open")
              .callsFake((url) => {
                return win.open.wrappedMethod.call(win, url, "_self");
              })
              .as("open");
          });
          cy.get("a").contains("Preview").click();
          cy.get("@open").should("have.been.calledWithMatch","https://app-apimaticio-test-eus.azurewebsites.net/api-docs-preview/");
          cy.get('.btn-get-started').click()
        
          for(let i=random;i<random+2;i++)
          {
          const sectionName = "Sec"+i 
          cy.waitUntil(()=>cy.get('.rc-menu-submenu-title').contains(sectionName).then(($ele)=>{
            cy.wrap($ele).click()
           }))
         // cy.get('.rc-menu-submenu-title').contains(sectionName).click()
          for(let j=random;j<random+2;j++){
          const pageName = "Page"+j
            cy.get('li').contains(pageName).click({force: true}) 
            cy.get('h1').contains(pageName)
          }
          }
        })
})