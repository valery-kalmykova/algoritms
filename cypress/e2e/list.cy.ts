describe('list test', () => {
  it('page load', () => {
    cy.visit('http://localhost:3000/list')
    cy.get('button[name="add to head"]').should('be.disabled');
    cy.get('button[name="add to tail"]').should('be.disabled');
    cy.get('button[name="add by index"]').should('be.disabled');
    cy.get('button[name="delete by index"]').should('be.disabled');
  })

  it('default list is correct', () => {
    cy.get('[class*=circle_circle]').each((el, index) => {
      if (index === 0) expect(el).to.contain('0');
      if (index === 1) expect(el).to.contain('34');
      if (index === 2) expect(el).to.contain('8');
      if (index === 3) expect(el).to.contain('1');
    })
    cy.get('[class*=circle_index]').each((el, index) => {
      cy.wrap(el).contains(index)
    })
    cy.get('[class*=circle_head]').each((el, index) => {
      if (index === 0) expect(el).to.contain('head');
      if (index === 1) expect(el).to.contain('');
      if (index === 2) expect(el).to.contain('');
      if (index === 3) expect(el).to.contain('');
    })
    cy.get('[class*=circle_tail]').each((el, index) => {
      if (index === 0) expect(el).to.contain('');
      if (index === 1) expect(el).to.contain('');
      if (index === 2) expect(el).to.contain('');
      if (index === 3) expect(el).to.contain('tail');
    })
  })

  it('added element to head', () => {
    cy.get('input').eq(0).type('3');
    cy.get('button[name="add to head"]').click().then(() => {
      cy.wait(2000)
      cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === 0) expect(el).to.contain('3');
        if (index === 1) expect(el).to.contain('0');        
      })
      cy.get('[class*=circle_head]').each((el, index) => {
        if (index === 0) expect(el).to.contain('head');
        if (index === 1) expect(el).to.contain('');        
      })
      cy.get('[class*=circle_tail]').each((el, index) => {        
        if (index === 3) expect(el).to.contain('');
        if (index === 4) expect(el).to.contain('tail');
      })
    })
  })

  it('added element to tail', () => {
    cy.get('input').eq(0).type('4');
    cy.get('button[name="add to tail"]').click().then(() => {
      cy.wait(2000)
      cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === 4) expect(el).to.contain('1');
        if (index === 5) expect(el).to.contain('4');        
      })
      cy.get('[class*=circle_head]').each((el, index) => {
        if (index === 0) expect(el).to.contain('head');
        if (index === 1) expect(el).to.contain('');        
      })
      cy.get('[class*=circle_tail]').each((el, index) => {        
        if (index === 4) expect(el).to.contain('');
        if (index === 5) expect(el).to.contain('tail');
      })
    })
  })

  it('added element by index', () => {
    cy.get('input').eq(0).type('5');
    cy.get('input').eq(1).type('1');
    cy.get('button[name="add by index"]').click().then(() => {
      cy.wait(2000)
      cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === 0) expect(el).to.contain('3'); 
        if (index === 1) expect(el).to.contain('5');
        if (index === 2) expect(el).to.contain('0');
      })
      cy.get('[class*=circle_head]').each((el, index) => {
        if (index === 0) expect(el).to.contain('head');
        if (index === 1) expect(el).to.contain('');        
      })
      cy.get('[class*=circle_tail]').each((el, index) => {        
        if (index === 5) expect(el).to.contain('');
        if (index === 6) expect(el).to.contain('tail');
      })
    })
  })

  it('delete element from head', () => {    
    cy.get('button[name="delete from head"]').click().then(() => {
      cy.wait(2000)
      cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === 0) expect(el).to.contain('5');
        if (index === 1) expect(el).to.contain('0');        
      })
      cy.get('[class*=circle_head]').each((el, index) => {
        if (index === 0) expect(el).to.contain('head');
        if (index === 1) expect(el).to.contain('');        
      })
      cy.get('[class*=circle_tail]').each((el, index) => {        
        if (index === 4) expect(el).to.contain('');
        if (index === 5) expect(el).to.contain('tail');
      })
    })
  })

  it('delete element from tail', () => {    
    cy.get('button[name="delete from tail"]').click().then(() => {
      cy.wait(2000)
      cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === 3) expect(el).to.contain('8');
        if (index === 4) expect(el).to.contain('1');        
      })      
      cy.get('[class*=circle_tail]').each((el, index) => {        
        if (index === 3) expect(el).to.contain('');
        if (index === 4) expect(el).to.contain('tail');
      })
    })
  })

  it('delete element by index', () => {    
    cy.get('input').eq(1).type('1');
    cy.get('button[name="delete by index"]').click().then(() => {
      cy.wait(2000)
      cy.get('[class*=circle_circle]').each((el, index) => {        
        if (index === 1) expect(el).to.contain('34');
        if (index === 2) expect(el).to.contain('8');
      })      
      cy.get('[class*=circle_tail]').each((el, index) => {        
        if (index === 2) expect(el).to.contain('');
        if (index === 3) expect(el).to.contain('tail');
      })
    })
  })

})