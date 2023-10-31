import { updateStates } from './update-states';
import {
  AFRICA,
  ALL_SELECTED_STATES,
  MOCK_IDS,
  SOME_SELECTED_STATES,
  TestItem,
} from '../mock-data';

describe('updateStates', () => {
  let item: TestItem = AFRICA;

  beforeEach(() => {
    item = AFRICA;
  });

  it('selects all states when the top node is selected', () => {
    expect(updateStates(true, item.id, {}, MOCK_IDS)).toEqual(
      ALL_SELECTED_STATES
    );
  });

  it('deselects all states when the top node is deselected', () => {
    expect(updateStates(false, item.id, ALL_SELECTED_STATES, MOCK_IDS)).toEqual(
      {}
    );
  });

  it('updates states when middle checkbox is selected', () => {
    item = AFRICA.children
      ?.find(({ id }) => id === 'Northern Africa')
      ?.children?.find(({ id }) => id === 'Morocco') ?? { id: 'Morocco' };

    expect(updateStates(true, item.id, {}, MOCK_IDS)).toEqual({
      Africa: 'indeterminate',
      Fes: 'checked',
      Marrakesh: 'checked',
      Morocco: 'checked',
      'Northern Africa': 'checked',
    });
  });

  it('updates states when leaf checkbox is selected', () => {
    item = AFRICA.children
      ?.find(({ id }) => id === 'Southern Africa')
      ?.children?.find(({ id }) => id === 'Namibia') ?? { id: 'Namibia' };

    expect(updateStates(true, item.id, {}, MOCK_IDS)).toEqual({
      Africa: 'indeterminate',
      Namibia: 'checked',
      'Southern Africa': 'indeterminate',
    });
  });

  it('updates indeterminate states to checked when selected', () => {
    item = AFRICA.children?.find(({ id }) => id === 'Southern Africa') ?? {
      id: 'Southern Africa',
    };

    expect(updateStates(true, item.id, SOME_SELECTED_STATES, MOCK_IDS)).toEqual(
      {
        Africa: 'indeterminate',
        Fes: 'checked',
        Morocco: 'indeterminate',
        Namibia: 'checked',
        'Northern Africa': 'indeterminate',
        'Southern Africa': 'checked',
        Swaziland: 'checked',
      }
    );
  });
});
