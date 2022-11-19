describe('SearchInputComponent', () => {
  let field = '';
  let icon = '';
  let stories: Record<string, string> = {};

  beforeEach(() => {
    field = '[data-test="core-search-input-field"]';
    icon = '[data-test="core-search-input-icon"]';
    stories = {
      base: '/iframe.html?path=/story/search-input--base',
      autofocus: '/iframe.html?path=/story/search-input--autofocus',
      disabled: '/iframe.html?path=/story/search-input--disabled',
      regularSize: '/iframe.html?path=/story/search-input--regular-size',
      error: '/iframe.html?path=/story/inputs-actions-search-input--error',
    };
  });

  it('Renders base state', () => {
    cy.visit(stories.base)
      .get(field)
      .should('exist')
      .should('not.have.focus')
      .should('have.value', '')
      .get(icon)
      .should('not.exist');
  });

  it('Updates when text is typed and cleared', () => {
    cy.visit(stories.base)
      .get(field)
      .click()
      .type('search term')
      .should('have.value', 'search term')
      .get(icon)
      .should('exist')
      .click()
      .get(field)
      .should('have.value', '')
      .get(icon)
      .should('not.exist')
      .get(field)
      .should('have.focus');
  });

  it("Can't be interacted with in disabled state", () => {
    cy.visit(stories.disabled)
      .get(field)
      .should('have.value', '')
      .should('be.disabled');
  });

  it('Has focus state when autofocus binding is set to true', () => {
    cy.visit(stories.autofocus).get(field).should('have.focus');
  });
});
