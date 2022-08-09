import { DELAY_IN_MS } from '../../src/constants/delays';

describe('string test', () => {
  it('button is disabled when page load', () => {
    cy.visit('http://localhost:3000/recursion')
    cy.get('button[name="add"]').should('be.disabled')
  })
  it('button is enabled when input has text', () => {
    cy.get('input').type('1234')
    cy.get('button[name="add"]').should('be.enabled')
  })
  it('button is disabled when input has cleared', () => {
    cy.get('input').clear()
    cy.get('button[name="add"]').should('be.disabled')
  }) 
  it('function reverse string is correct', () => {
    cy.get('input').type('12')
    cy.get('button[name="add"]').debug().click().then(() => {
      cy.get('[class*=circle_circle]').each((el, index) => {         
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');     
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('2')
      })
      cy.wait(500)
      cy.get('[class*=circle_circle]').each((el) => {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      })      
      cy.wait(500)
      cy.get('[class*=circle_circle]').each((el) => {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      })
    });    
  })
})