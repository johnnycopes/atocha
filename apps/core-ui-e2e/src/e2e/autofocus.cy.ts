describe('AutofocusDirective', () => {
  let input = '';
  let textarea = '';
  let stories: Record<string, string> = {};

  beforeEach(() => {
    input = 'input';
    textarea = 'textarea';
    stories = {
      base: '/iframe.html?path=/story/autofocus--base',
      input: '/iframe.html?path=/story/autofocus--input',
      textarea: '/iframe.html?path=/story/autofocus--textarea',
      turnedOff: '/iframe.html?path=/story/autofocus--turned-off',
    };
  });

  it('Focuses when directive is attached to element', () => {
    cy.visit(stories.base).get(input).should('have.focus');
  });

  it('Focuses on input when directive is set to true', () => {
    cy.visit(stories.input).get(input).should('have.focus');
  });

  it('Focuses on textarea when directive is set to true', () => {
    cy.visit(stories.textarea).get(textarea).should('have.focus');
  });

  it('Does not focus when directive is set to false', () => {
    cy.visit(stories.turnedOff).get(input).should('not.have.focus');
  });
});
