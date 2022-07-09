import { CheckboxState } from "@atocha/core/ui";


describe('NestedCheckboxesComponent', () => {
  let checkboxSelector = '';
  let stories: Record<string, string> = {};

  function assertState(place: string, state: CheckboxState): void {
    cy
      .get(checkboxSelector)
      .contains(place)
      .parent().should('have.class', `checkbox--${state}`);
  }

  beforeEach(() => {
    checkboxSelector = '[data-test="ui-nested-checkboxes-checkbox"]'
    stories = {
      noneSelected: '/iframe.html?id=nestedcheckboxescomponent--none-selected',
      someSelected: '/iframe.html?id=nestedcheckboxescomponent--some-selected',
      allSelected: '/iframe.html?id=nestedcheckboxescomponent--all-selected',
    };
  });

  it('Renders checkboxes correctly', () => {
    cy
      .visit(stories.noneSelected)
      .get(checkboxSelector)
      .should('have.length', 9)
  });

  it("Selects entire tree when none are checked and the top one is clicked", () => {
    cy
      .visit(stories.noneSelected)
      .get(checkboxSelector).contains('Africa')
      .click();

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

  it("Deselects entire tree when all are checked and the top one is clicked", () => {
    cy
      .visit(stories.allSelected)
      .get(checkboxSelector).contains('Africa')
      .click();

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

  it("Correctly affects tree when middle checkbox is clicked", () => {
    cy
      .visit(stories.noneSelected)
      .get(checkboxSelector).contains('Morocco')
      .click();

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

  it("Correctly affects tree when leaf checkbox is clicked", () => {
    cy
      .visit(stories.noneSelected)
      .get(checkboxSelector).contains('Namibia')
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
    cy
      .visit(stories.someSelected)
      .get(checkboxSelector).contains('Southern Africa')
      .click()
      .click()
      .get(checkboxSelector).contains('Northern Africa')
      .click();

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
