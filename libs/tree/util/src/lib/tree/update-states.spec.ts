import { updateStates } from './update-states';
import {
  AFRICA,
  ALL_SELECTED_STATES,
  SOME_SELECTED_STATES,
  TestItem,
} from '../shared/mock-data';
import { MOCK_TREE } from './ids/mock-ids';

describe('updateStates', () => {
  let item: TestItem = AFRICA;

  beforeEach(() => {
    item = AFRICA;
  });

  it('selects all states when the top node is selected', () => {
    const states = {};

    updateStates({ states, tree: MOCK_TREE, targetId: item.id });

    expect(states).toEqual(ALL_SELECTED_STATES);
  });

  it('deselects all states when the top node is deselected', () => {
    const states = ALL_SELECTED_STATES;

    updateStates({ states, tree: MOCK_TREE, targetId: item.id });

    expect(states).toEqual({});
  });

  it('updates states when middle checkbox is selected', () => {
    const states = {};

    updateStates({
      states,
      tree: MOCK_TREE,
      targetId: 'Morocco',
    });

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

    updateStates({
      states,
      tree: MOCK_TREE,
      targetId: 'Namibia',
    });

    expect(states).toEqual({
      Africa: 'indeterminate',
      Namibia: 'checked',
      'Southern Africa': 'indeterminate',
    });
  });

  it('updates indeterminate states to checked when selected', () => {
    const states = SOME_SELECTED_STATES;

    updateStates({
      states,
      tree: MOCK_TREE,
      targetId: 'Southern Africa',
    });

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
