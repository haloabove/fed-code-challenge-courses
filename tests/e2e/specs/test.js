describe('VueJs Home page', () => {
  it('Visits the Home page', () => {
    cy.visit('/')
    cy.get('.cart').contains('Cart')
  })
  it('Can Search', () => {
    cy.get('#wordSearch').type('James White')
    cy.get('#searchWord').click()
    cy.get('#coursesTable').get('tbody').find('tr').should('have.length', 1)
  })
  it('Can Filter', () => {
    cy.get('.authors').click()
    cy.get('.multiselect__content>li:first').click()
    cy.get('#coursesTable').get('tbody').find('tr').should('have.length', 1)
  })

  it('Can add to Cart', () => {
    cy.get('#coursesTable').get('tbody>tr:first button').click()
    cy.wait(2000)
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.get('#submit').click()
    cy.get('.cart .list-group').should('have.id', 'cart-items')
  })

  it('Can remove from Cart', () => {
    cy.get('.cart .list-group button').click()
    cy.get('.cart p').should('have.id', 'cart-empty')
  })
})
