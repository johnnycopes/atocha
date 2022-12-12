describe('NestedCheckboxesWithCountsComponent', () => {
  let checkboxSelector = '';
  let stories: Record<string, string> = {};

  function assertCount(place: string, count: string): void {
    cy.get(checkboxSelector)
      .contains(place)
      .should('contain.text', `${place} (${count})`);
  }

  beforeEach(() => {
    checkboxSelector = '[data-test="core-nested-checkbox"]';
    stories = {
      noneSelected: '/iframe.html?id=counted-checkbox-tree--none-selected',
      someSelected: '/iframe.html?id=counted-checkbox-tree--some-selected',
      allSelected: '/iframe.html?id=counted-checkbox-tree--all-selected',
    };
  });

  it('Displays all states correctly when model is passed in', () => {
    cy.visit(stories.someSelected);

    assertCount('Africa', '39 / 130');
    assertCount('Southern Africa', '28 / 45');
    assertCount('Swaziland', '28');
    assertCount('Namibia', '17');
    assertCount('Central Africa', '65');
    assertCount('Northern Africa', '11 / 20');
    assertCount('Morocco', '11 / 20');
    assertCount('Marrakesh', '9');
    assertCount('Fes', '11');
  });

  it('Selects entire tree when none are checked and the top one is clicked', () => {
    cy.visit(stories.noneSelected)
      .get(checkboxSelector)
      .contains('Africa')
      .click();

    assertCount('Africa', '130 / 130');
    assertCount('Southern Africa', '45 / 45');
    assertCount('Swaziland', '28');
    assertCount('Namibia', '17');
    assertCount('Central Africa', '65');
    assertCount('Northern Africa', '20 / 20');
    assertCount('Morocco', '20 / 20');
    assertCount('Marrakesh', '9');
    assertCount('Fes', '11');
  });

  it('Deselects entire tree when all are checked and the top one is clicked', () => {
    cy.visit(stories.allSelected)
      .get(checkboxSelector)
      .contains('Africa')
      .click();

    assertCount('Africa', '0 / 130');
    assertCount('Southern Africa', '0 / 45');
    assertCount('Swaziland', '28');
    assertCount('Namibia', '17');
    assertCount('Central Africa', '65');
    assertCount('Northern Africa', '0 / 20');
    assertCount('Morocco', '0 / 20');
    assertCount('Marrakesh', '9');
    assertCount('Fes', '11');
  });

  it('Correctly affects tree when middle checkbox is clicked', () => {
    cy.visit(stories.noneSelected)
      .get(checkboxSelector)
      .contains('Morocco')
      .click();

    assertCount('Africa', '20 / 130');
    assertCount('Southern Africa', '0 / 45');
    assertCount('Swaziland', '28');
    assertCount('Namibia', '17');
    assertCount('Central Africa', '65');
    assertCount('Northern Africa', '20 / 20');
    assertCount('Morocco', '20 / 20');
    assertCount('Marrakesh', '9');
    assertCount('Fes', '11');
  });

  it('Correctly affects tree when leaf checkbox is clicked', () => {
    cy.visit(stories.noneSelected)
      .get(checkboxSelector)
      .contains('Namibia')
      .click();

    assertCount('Africa', '17 / 130');
    assertCount('Southern Africa', '17 / 45');
    assertCount('Swaziland', '28');
    assertCount('Namibia', '17');
    assertCount('Central Africa', '65');
    assertCount('Northern Africa', '0 / 20');
    assertCount('Morocco', '0 / 20');
    assertCount('Marrakesh', '9');
    assertCount('Fes', '11');
  });

  it('Converts indeterminate states to checked when clicked', () => {
    cy.visit(stories.someSelected)
      .get(checkboxSelector)
      .contains('Southern Africa')
      .click()
      .click()
      .get(checkboxSelector)
      .contains('Northern Africa')
      .click();

    assertCount('Africa', '20 / 130');
    assertCount('Southern Africa', '0 / 45');
    assertCount('Swaziland', '28');
    assertCount('Namibia', '17');
    assertCount('Central Africa', '65');
    assertCount('Northern Africa', '20 / 20');
    assertCount('Morocco', '20 / 20');
    assertCount('Marrakesh', '9');
    assertCount('Fes', '11');
  });
});
