import { updateStates } from './update-states';
import {
  AFRICA,
  ALL_SELECTED_STATES,
  MOCK_IDS,
  SOME_SELECTED_STATES,
  TestItem,
} from './mock-data';

describe('updateStates', () => {
  let item: TestItem = AFRICA;

  beforeEach(() => {
    item = AFRICA;
  });

  it('selects all states when the top node is selected', () => {
    const states = {};

    updateStates(true, item.id, states, MOCK_IDS);

    expect(states).toEqual(ALL_SELECTED_STATES);
  });

  it('deselects all states when the top node is deselected', () => {
    const states = ALL_SELECTED_STATES;

    updateStates(false, item.id, ALL_SELECTED_STATES, MOCK_IDS);

    expect(states).toEqual({});
  });

  it('updates states when middle checkbox is selected', () => {
    const states = {};

    updateStates(true, 'Morocco', states, MOCK_IDS);

    expect(states).toEqual({
      Africa: 'indeterminate',
      Fes: 'checked',
      Marrakesh: 'checked',
      Morocco: 'checked',
      'Northern Africa': 'checked',
    });
  });

  it('updates states when leaf checkbox is selected', () => {
    const states = {};

    updateStates(true, 'Namibia', states, MOCK_IDS);

    expect(states).toEqual({
      Africa: 'indeterminate',
      Namibia: 'checked',
      'Southern Africa': 'indeterminate',
    });
  });

  it('updates indeterminate states to checked when selected', () => {
    const states = SOME_SELECTED_STATES;

    updateStates(true, 'Southern Africa', SOME_SELECTED_STATES, MOCK_IDS);

    expect(states).toEqual({
      Africa: 'indeterminate',
      Fes: 'checked',
      Morocco: 'indeterminate',
      Namibia: 'checked',
      'Northern Africa': 'indeterminate',
      'Southern Africa': 'checked',
      Swaziland: 'checked',
    });
  });
});
