describe('oxioracle-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('has README link', () => {
    cy.get('[data-test="app-name"')
      .should('have.attr', 'href')
      .and('include', 'README')
      .then((href) => cy.visit(String(href)));
  });

  describe('loads table route', () => {
    it('by default', () => {
      cy.get('[data-test="table"]').should('exist');
    });

    it('via route', () => {
      cy.visit('/');

      cy.get('[data-test="table"]').should('exist');
    });

    it('via nav', () => {
      cy.get('[data-test="table-link"]').click();

      cy.get('[data-test="table"]').should('exist');
    });
  });

  describe('loads charts route', () => {
    it('by URL', () => {
      cy.visit('/charts');

      cy.get('[data-test="bar-chart"]').should('exist');
      cy.get('[data-test="pie-chart"]').should('exist');
    });

    it('via nav', () => {
      cy.get('[data-test="charts-link"]').click();

      cy.get('[data-test="bar-chart"]').should('exist');
      cy.get('[data-test="pie-chart"]').should('exist');
    });
  });

  describe('loads form route', () => {
    it('by URL', () => {
      cy.visit('/form');

      cy.get('[data-test="form"]').should('exist');
    });

    it('via nav', () => {
      cy.get('[data-test="form-link"]').click();

      cy.get('[data-test="form"]').should('exist');
    });
  });

  it('loads "page not found" route for invalid URLs', () => {
    cy.visit('/bogus');

    cy.get('[data-test="page-not-found"]').should('exist');
  });
});
