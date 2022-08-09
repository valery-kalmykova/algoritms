beforeEach(() => {
  cy.visit('http://localhost:3000')
})
describe('app', () => {
  it('app works', () => {
    cy.visit('http://localhost:3000')
  })
  it('route to recursion', () => {
    cy.get('a[href*="/recursion"]').click();
    cy.url().should('include', '/recursion')    
  })
  it('route to fibonacci', () => {
    cy.get('a[href*="/fibonacci"]').click();
    cy.url().should('include', '/fibonacci')    
  })
  it('route to sorting', () => {
    cy.get('a[href*="/sorting"]').click();
    cy.url().should('include', '/sorting')    
  })
  it('route to stack', () => {
    cy.get('a[href*="/stack"]').click();
    cy.url().should('include', '/stack')    
  })
  it('route to queue', () => {
    cy.get('a[href*="/queue"]').click();
    cy.url().should('include', '/queue')    
  })
  it('route to list', () => {
    cy.get('a[href*="/list"]').click();
    cy.url().should('include', '/list')    
  })
})