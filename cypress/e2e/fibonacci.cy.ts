import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('fibonacci test', () => {
  it('button is disabled when page load', () => {
    cy.visit('http://localhost:3000/fibonacci');
    cy.get('button[name="calculate"]').should('be.disabled')
  })
  it('function fibonacci is correct', () => {
    cy.get('input').type('3');
    cy.get('button[name="calculate"]').click();
    cy.get('[class*=circle_circle]').should('have.length', 1)
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class*=circle_circle]').should('have.length', 2)
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class*=circle_circle]').should('have.length', 3)
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class*=circle_circle]').should('have.length', 4).each((el, index) => {
      if (index === 0) {
        cy.wrap(el).contains('1')
        cy.wrap(el.next()).contains('0')
      }
      if (index === 1) {
        cy.wrap(el).contains('1')
        cy.wrap(el.next()).contains('1')
      }
      if (index === 2) {
        cy.wrap(el).contains('2')
        cy.wrap(el.next()).contains('2')
      }
      if (index === 3) {
        cy.wrap(el).contains('3')
        cy.wrap(el.next()).contains('3')
      }
    })
  })
})