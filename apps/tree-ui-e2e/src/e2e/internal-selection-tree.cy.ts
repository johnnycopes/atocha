describe('InternalSelectionTreeComponent', () => {
  let checkboxSelector = '';
  let inputSelector = '';
  let stories: Record<string, string> = {};

  function assertIndentation(place: string, indentation: number): void {
    cy.get(checkboxSelector)
      .contains(place)
      .parent()
      .should('have.css', 'margin-left', `${indentation}px`);
  }

  function assertState(
    place: string,
    state: 'checked' | 'unchecked' | 'indeterminate'
  ): void {
    if (state === 'checked') {
      cy.get(checkboxSelector)
        .contains(place)
        .find(inputSelector)
        .should('be.checked');
    } else if (state === 'unchecked') {
      cy.get(checkboxSelector)
        .contains(place)
        .find(inputSelector)
        .should('not.be.checked');
    } else {
      cy.get(checkboxSelector)
        .contains(place)
        .find(inputSelector)
        .should('have.prop', 'indeterminate');
    }
  }

  beforeEach(() => {
    checkboxSelector = '[data-test="core-checkbox"]';
    inputSelector = '[data-test="core-checkbox-input"]';
    stories = {
      noneSelected: '/iframe.html?id=internal-selection-tree--none-selected',
      someSelected: '/iframe.html?id=internal-selection-tree--some-selected',
      allSelected: '/iframe.html?id=internal-selection-tree--all-selected',
    };
  });

  it('Renders checkboxes correctly', () => {
    cy.visit(stories.noneSelected).get(checkboxSelector);
    cy.should('have.length', 9);

    assertIndentation('Africa', 0);
    assertIndentation('Southern Africa', 24);
    assertIndentation('Swaziland', 48);
    assertIndentation('Namibia', 48);
    assertIndentation('Central Africa', 24);
    assertIndentation('Northern Africa', 24);
    assertIndentation('Morocco', 48);
    assertIndentation('Marrakesh', 72);
    assertIndentation('Fes', 72);
  });

  it('Displays all states correctly when model is passed in', () => {
    cy.visit(stories.someSelected);

    assertState('Africa', 'indeterminate');
    assertState('Southern Africa', 'indeterminate');
    assertState('Swaziland', 'checked');
    assertState('Namibia', 'unchecked');
    assertState('Central Africa', 'unchecked');
    assertState('Northern Africa', 'indeterminate');
    assertState('Morocco', 'indeterminate');
    assertState('Marrakesh', 'unchecked');
    assertState('Fes', 'checked');
  });

  it('Selects entire tree when none are checked and the top one is clicked', () => {
    cy.visit(stories.noneSelected).get(checkboxSelector);
    cy.contains('Africa').click();

    assertState('Africa', 'checked');
    assertState('Southern Africa', 'checked');
    assertState('Swaziland', 'checked');
    assertState('Namibia', 'checked');
    assertState('Central Africa', 'checked');
    assertState('Northern Africa', 'checked');
    assertState('Morocco', 'checked');
    assertState('Marrakesh', 'checked');
    assertState('Fes', 'checked');
  });

  it('Deselects entire tree when all are checked and the top one is clicked', () => {
    cy.visit(stories.allSelected).get(checkboxSelector);
    cy.contains('Africa').click();

    assertState('Africa', 'unchecked');
    assertState('Southern Africa', 'unchecked');
    assertState('Swaziland', 'unchecked');
    assertState('Namibia', 'unchecked');
    assertState('Central Africa', 'unchecked');
    assertState('Northern Africa', 'unchecked');
    assertState('Morocco', 'unchecked');
    assertState('Marrakesh', 'unchecked');
    assertState('Fes', 'unchecked');
  });

  it('Correctly affects tree when middle checkbox is clicked', () => {
    cy.visit(stories.noneSelected).get(checkboxSelector);
    cy.contains('Morocco').click();

    assertState('Africa', 'indeterminate');
    assertState('Southern Africa', 'unchecked');
    assertState('Swaziland', 'unchecked');
    assertState('Namibia', 'unchecked');
    assertState('Central Africa', 'unchecked');
    assertState('Northern Africa', 'checked');
    assertState('Morocco', 'checked');
    assertState('Marrakesh', 'checked');
    assertState('Fes', 'checked');
  });

  it('Correctly affects tree when leaf checkbox is clicked', () => {
    cy.visit(stories.noneSelected)
      .get(checkboxSelector)
      .contains('Namibia')
      .click();

    assertState('Africa', 'indeterminate');
    assertState('Southern Africa', 'indeterminate');
    assertState('Swaziland', 'unchecked');
    assertState('Namibia', 'checked');
    assertState('Central Africa', 'unchecked');
    assertState('Northern Africa', 'unchecked');
    assertState('Morocco', 'unchecked');
    assertState('Marrakesh', 'unchecked');
    assertState('Fes', 'unchecked');
  });

  it('Converts indeterminate states to checked when clicked', () => {
    cy.visit(stories.someSelected);
    cy.get(checkboxSelector).contains('Southern Africa').click();
    cy.get(checkboxSelector).contains('Southern Africa').click();
    cy.get(checkboxSelector).contains('Northern Africa').click();

    assertState('Africa', 'indeterminate');
    assertState('Southern Africa', 'unchecked');
    assertState('Swaziland', 'unchecked');
    assertState('Namibia', 'unchecked');
    assertState('Central Africa', 'unchecked');
    assertState('Northern Africa', 'checked');
    assertState('Morocco', 'checked');
    assertState('Marrakesh', 'checked');
    assertState('Fes', 'checked');
  });
});
