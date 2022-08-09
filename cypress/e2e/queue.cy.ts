describe('queue test', () => {
  it('page load', () => {
    cy.visit('http://localhost:3000/queue')
    cy.get('button[name="add"]').should('be.disabled')
    cy.get('button[name="delete"]').should('be.disabled')
    cy.get('button[name="clear"]').should('be.disabled')
  })

  it('enable submit button with input has text', () => {    
    cy.get('input').type('4');
    cy.get('button[name="add"]').should('be.enabled')
    cy.get('button[name="delete"]').should('be.disabled')
    cy.get('button[name="clear"]').should('be.disabled')    
  })

  it('added first element to queue/change color', () => {    
    cy.get('button[name="add"]').debug().click().then(() => {
      cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('4')
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        }
      })
      cy.get('[class*=circle_head]').each((el, index) => {
        if (index === 0) expect(el).to.contain('head')
      })
      cy.get('[class*=circle_tail]').each((el, index) => {
        if (index === 0) expect(el).to.contain('tail')
      })
      cy.wait(500);
      cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('4')
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        }
      })
    });     
  })  

  it('added second element to queue', () => {    
    cy.get('input').type('5');
    cy.get('button[name="add"]').click().then(() => {
      cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === 0) expect(el).to.contain('4')
        if (index === 1) expect(el).to.contain('5')
      })
      cy.get('[class*=circle_head]').each((el, index) => {
        if (index === 0) expect(el).to.contain('head')
        if (index === 1) expect(el).to.contain('')
      })
      cy.get('[class*=circle_tail]').each((el, index) => {
        if (index === 0) expect(el).to.contain('')
        if (index === 1) expect(el).to.contain('tail')
      })
    })
    cy.wait(1000)   
  })

  it('deleted first element', () => {
    cy.get('button[name="delete"]').click().then(() => {
      cy.wait(1000)
      cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === 1) expect(el).to.contain('5')        
      })
      cy.get('[class*=circle_head]').each((el, index) => {
        if (index === 1) expect(el).to.contain('head')        
      })
      cy.get('[class*=circle_tail]').each((el, index) => {        
        if (index === 1) expect(el).to.contain('tail')
      })
    })
    cy.wait(1000)
  })

  it('cleared queue', () => {
    cy.get('input').type('6');
    cy.get('button[name="add"]').click();
    cy.get('button[name="clear"]').click().then(() => {
      cy.get('[class*=circle_circle]').each((el, index) => {
        expect(el).to.contain('')      
      })
      cy.get('[class*=circle_head]').each((el, index) => {
        expect(el).to.contain('')         
      })
      cy.get('[class*=circle_tail]').each((el, index) => {        
        expect(el).to.contain('') 
      })
    })
  })
})