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
    cy.visit(stories.base);
    cy.get(button);
    cy.should('has.class', 'core-button--primary');
  });

  it('Can be attached to <button> element', () => {
    cy.visit(stories.base);
    cy.get(button);
    cy.should('not.be.disabled').click();
    cy.should('have.focus');
  });

  it('Can be attached to <a> element', () => {
    cy.visit(stories.asLink).get(button).should('have.attr', 'href');
  });

  it('Renders appropriate variant', () => {
    cy.visit(stories.primary);
    cy.get(button);
    cy.should('have.class', 'core-button--primary');

    cy.visit(stories.secondary);
    cy.get(button);
    cy.should('have.class', 'core-button--secondary');

    cy.visit(stories.tertiary);
    cy.get(button);
    cy.should('have.class', 'core-button--tertiary');

    cy.visit(stories.danger);
    cy.get(button);
    cy.should('have.class', 'core-button--danger');
  });
});
