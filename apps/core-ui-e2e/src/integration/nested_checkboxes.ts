import { CheckboxState } from "@atocha/core/ui";

describe('NestedCheckboxesComponent', () => {
  before(() => {
    cy.visit('/iframe.html?id=nestedcheckboxescomponent--none-selected');
  });

  it('Renders correct number of checkboxes', () => {
    cy
      .get('[data-test="ui-nested-checkboxes-checkbox"]')
      .should('have.length', 9);
  });

  it("Affects parents and target when leaf checkbox is clicked", () => {
    cy
      .get('[data-test="ui-nested-checkboxes-checkbox"]').contains('Namibia')
      .click()

    assertState('Africa', 'indeterminate');
    assertState('Southern Africa', 'indeterminate');
    assertState('Namibia', 'checked');
  });

  it("Marks entire tree of checkboxes as checked when the top one is clicked", () => {
    cy
      .get('[data-test="ui-nested-checkboxes-checkbox"]').contains('Africa')
      .click()

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
});

function assertState(place: string, state: CheckboxState): void {
  cy
    .get('[data-test="ui-nested-checkboxes-checkbox"]')
    .contains(place)
    .parent().should('have.class', `checkbox--${state}`);
}
