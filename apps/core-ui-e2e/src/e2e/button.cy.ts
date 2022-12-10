describe('ButtonComponent', () => {
  let button = '';
  let stories: Record<string, string> = {};

  beforeEach(() => {
    button = '[data-test="core-button"]';
    stories = {
      base: '/iframe.html?path=/story/buttoncomponent--base',
      asLink: '/iframe.html?path=/story/buttoncomponent--as-link',
      disabled: '/iframe.html?path=/story/buttoncomponent--disabled',
      primary: '/iframe.html?path=/story/buttoncomponent--primary',
      secondary: '/iframe.html?path=/story/buttoncomponent--secondary',
      tertiary: '/iframe.html?path=/story/buttoncomponent--tertiary',
      danger: '/iframe.html?path=/story/buttoncomponent--danger',
    };
  });

  it('Renders primary variant by default', () => {
    cy.visit(stories.base)
      .get(button)
      .should('has.class', 'core-button--primary');
  });

  it('Can be attached to <button> element', () => {
    cy.visit(stories.base)
      .get(button)
      .should('not.be.disabled')
      .click()
      .should('have.focus');
  });

  it('Can be attached to <a> element', () => {
    cy.visit(stories.asLink).get(button).should('have.attr', 'href');
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

    cy.visit(stories.danger)
      .get(button)
      .should('have.class', 'core-button--danger');
  });
});
