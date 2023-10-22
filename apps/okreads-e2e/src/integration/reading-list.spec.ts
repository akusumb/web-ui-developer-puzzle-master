describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: undo to revert by back old changes', () => {
    // search and get result and then click on undo
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
    cy.get('[mat-flat-button]:first').click();
    cy.wait(2000);
    cy.get("#undoAction").click();
    cy.get('[mat-flat-button]:first').should('be.enabled');
  });
});
