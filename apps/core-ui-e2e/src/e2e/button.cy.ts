describe('ButtonComponent', () => {
  let button = '';
  let stories: Record<string, string> = {};

  beforeEach(() => {
    button = '[data-test="core-button"]';
    stories = {
      base: '/iframe.html?path=/story/buttoncomponent--base',
      disabled: '/iframe.html?path=/story/buttoncomponent--disabled',
      primary: '/iframe.html?path=/story/buttoncomponent--primary',
      secondary: '/iframe.html?path=/story/buttoncomponent--secondary',
      tertiary: '/iframe.html?path=/story/buttoncomponent--tertiary',
    };
  });

  it('Renders primary variant by default', () => {
    cy.visit(stories.base)
      .get(button)
      .should('has.class', 'core-button--primary');
  });

  it('Can be clicked by default', () => {
    cy.visit(stories.base)
      .get(button)
      .should('not.be.disabled')
      .click()
      .should('have.focus');
  });

  it('Can be disabled', () => {
    cy.visit(stories.disabled).get(button).should('be.disabled');
  });

  it('Renders appropriate variant', () => {
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
