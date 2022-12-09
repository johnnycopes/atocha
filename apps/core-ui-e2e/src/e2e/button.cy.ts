describe('ButtonComponent', () => {
  let button = '';
  let stories: Record<string, string> = {};

  beforeEach(() => {
    button = '[data-test="core-button"]';
    stories = {
      primary: '/iframe.html?path=/story/buttoncomponent--primary',
      secondary: '/iframe.html?path=/story/buttoncomponent--secondary',
      tertiary: '/iframe.html?path=/story/buttoncomponent--tertiary',
      disabled: '/iframe.html?path=/story/buttoncomponent--disabled',
    };
  });

  it('Exists', () => {
    cy.visit(stories.primary).get(button).should('exist');
  });

  it('Can be clicked by default', () => {
    cy.visit(stories.primary)
      .get(button)
      .should('not.be.disabled')
      .click()
      .should('have.focus');
  });

  it('Can be disabled', () => {
    cy.visit(stories.disabled).get(button).should('be.disabled');
  });

  it('Has correct class according to variant', () => {
    cy.visit(stories.primary)
      .get(button)
      .should('have.class', 'core-button--primary');

    cy.visit(stories.secondary)
      .get(button)
      .should('have.class', 'core-button--secondary');

    cy.visit(stories.tertiary)
      .get(button)
      .should('have.class', 'core-button--tertiary');
  });
});
