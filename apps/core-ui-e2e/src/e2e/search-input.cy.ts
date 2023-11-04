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
    };
  });

  it('Renders base state', () => {
    cy.visit(stories.base);
    cy.get(field);
    cy.should('exist');
    cy.should('not.have.focus');
    cy.should('have.value', '');
    cy.get(icon);
    cy.should('not.exist');
  });

  it('Updates when text is typed and cleared', () => {
    cy.visit(stories.base);
    cy.get(field);
    cy.click();
    cy.type('search term');
    cy.should('have.value', 'search term');
    cy.get(icon);
    cy.should('exist');
    cy.click();
    cy.get(field);
    cy.should('have.value', '');
    cy.get(icon);
    cy.should('not.exist');
    cy.get(field);
    cy.should('have.focus');
  });

  it("Can't be interacted with in disabled state", () => {
    cy.visit(stories.disabled);
    cy.get(field);
    cy.should('have.value', '');
    cy.should('be.disabled');
  });

  it('Has focus state when autofocus binding is set to true', () => {
    cy.visit(stories.autofocus).get(field).should('have.focus');
  });
});
