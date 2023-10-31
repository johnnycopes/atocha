import { updateItemAndDescendantStates } from './update-item-and-descendant-states';
import {
  TestItem,
  AFRICA,
  ALL_SELECTED_STATES,
  SOME_SELECTED_STATES,
  MOCK_IDS,
} from '../mock-data';

describe('updateItemAndDescendantStates', () => {
  let item: TestItem = AFRICA;

  beforeEach(() => {
    item = AFRICA;
  });

  it('selects all states when the top node is selected', () => {
    expect(
      updateItemAndDescendantStates({
        id: item.id,
        checked: true,
        states: {},
        ids: MOCK_IDS,
      })
    ).toEqual({
      Africa: 'checked',
      'Southern Africa': 'checked',
      'Central Africa': 'checked',
      'Northern Africa': 'checked',
      Swaziland: 'checked',
      Namibia: 'checked',
      Morocco: 'checked',
      Marrakesh: 'checked',
      Fes: 'checked',
    });
  });

  it('deselects all states when the top node is deselected', () => {
    expect(
      updateItemAndDescendantStates({
        id: item.id,
        checked: false,
        states: ALL_SELECTED_STATES,
        ids: MOCK_IDS,
      })
    ).toEqual({});
  });

  it('updates states when middle checkbox is selected', () => {
    item = item.children
      ?.find(({ id }) => id === 'Northern Africa')
      ?.children?.find(({ id }) => id === 'Morocco') ?? { id: 'Morocco' };

    expect(
      updateItemAndDescendantStates({
        id: item.id,
        checked: true,
        states: {},
        ids: MOCK_IDS,
      })
    ).toEqual({
      Morocco: 'checked',
      Marrakesh: 'checked',
      Fes: 'checked',
    });
  });

  it('updates states when leaf checkbox is selected', () => {
    item = item.children
      ?.find(({ id }) => id === 'Southern Africa')
      ?.children?.find(({ id }) => id === 'Namibia') ?? { id: 'Namibia' };

    expect(
      updateItemAndDescendantStates({
        id: item.id,
        checked: true,
        states: {},
        ids: MOCK_IDS,
      })
    ).toEqual({ Namibia: 'checked' });
  });

  it('updates indeterminate states to checked when selected', () => {
    item = item.children?.find(({ id }) => id === 'Southern Africa') ?? {
      id: 'Southern Africa',
    };

    expect(
      updateItemAndDescendantStates({
        id: item.id,
        checked: true,
        states: SOME_SELECTED_STATES,
        ids: MOCK_IDS,
      })
    ).toEqual({
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
