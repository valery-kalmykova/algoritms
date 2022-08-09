import { DELAY_IN_MS } from '../../src/constants/delays';

describe('stack test', () => {
  it('page load', () => {
    cy.visit('http://localhost:3000/stack');
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

  it('added first element/change color', () => {       
    cy.get('button[name="add"]').debug().click().then(() => {      
      cy.get('[class*=circle_circle]')
        .should('have.length', 1)
        .should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        .contains('4')
      cy.get('[class*=circle_index]').contains('0');
      cy.get('[class*=circle_head]').contains('head');
      cy.wait(500);
      cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })    
  })

  it('added second element', () => {
    cy.get('input').type('5');    
    cy.get('button[name="add"]').click().then(() => {      
      cy.get('[class*=circle_circle]')
        .should('have.length', 2)
        .each((el, index) => {
          if (index === 0) expect(el).to.contain('4')
          if (index === 1) expect(el).to.contain('5')
        })
      cy.get('[class*=circle_index]').each((el, index) => {
        cy.wrap(el).contains(index)
      })
      cy.get('[class*=circle_head]').each((el, index) => {
        if (index === 0) expect(el).to.contain('')
        if (index === 1) expect(el).to.contain('head')       
      })
    })
  })

  it('deleted last element', () => {
    cy.get('button[name="delete"]').click().then(() => {
      cy.get('[class*=circle_circle]')
        .should('have.length', 1)
        .contains('4');
      cy.get('[class*=circle_index]').contains('0');
      cy.get('[class*=circle_head]').contains('head');
    })
  })

  it('cleared stack', () => {
    cy.get('input').type('5');
    cy.get('button[name="add"]').click();
    cy.get('[class*=circle_circle]').should('have.length', 2)
    cy.get('button[name="clear"]').click();
    cy.get('[class*=circle_circle]').should('have.length', 0)
  })
  
})