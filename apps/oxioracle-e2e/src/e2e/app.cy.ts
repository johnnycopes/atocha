describe('oxioracle-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('has README link', () => {
    cy.get('[data-test="app-name"')
      .should('have.attr', 'href')
      .and('include', 'README');
    // TODO: add after README file is created
    // .then((href) => cy.visit(String(href)));
  });

  it('loads table route', () => {
    cy.get('[data-test="table-link"]').click();

    cy.get('[data-test="table"]').should('exist');
  });

  it('loads charts route', () => {
    cy.get('[data-test="charts-link"]').click();

    cy.get('[data-test="bar-chart"]').should('exist');
    cy.get('[data-test="pie-chart"]').should('exist');
  });

  it('loads form route', () => {
    cy.get('[data-test="form-link"]').click();

    cy.get('[data-test="form"]').should('exist');
  });
});
