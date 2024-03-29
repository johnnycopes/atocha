import { Root } from './root';
import { ADVERSARIES_ROOT, SCENARIOS_ROOT, SPIRITS_ROOT } from './test-data';

describe('Root', () => {
  let root: Root;

  beforeEach(() => {
    root = new Root([
      'Horizons',
      'Jagged Earth',
      'Branch & Claw',
      'Nature Incarnate',
      'Promo Pack 1',
      'Promo Pack 2',
    ]);
  });

  it('generates expansions root', () => {
    expect(root.expansions).toStrictEqual({
      id: 'Expansions',
      children: [
        { id: 'Branch & Claw' },
        { id: 'Horizons' },
        { id: 'Jagged Earth' },
        { id: 'Nature Incarnate' },
        { id: 'Promo Pack 1' },
        { id: 'Promo Pack 2' },
      ],
    });
  });

  it('generates spirits root', () => {
    expect(root.spirits).toStrictEqual(SPIRITS_ROOT);
  });

  it('generates maps root', () => {
    expect(root.maps).toStrictEqual({
      id: 'Maps',
      children: [
        { id: 'Balanced', display: { difficulty: 0 } },
        { id: 'Thematic', display: { difficulty: 1 } },
      ],
    });
  });

  it('generates boards root', () => {
    expect(root.boards).toStrictEqual({
      id: 'Boards',
      children: [
        { id: 'A' },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' },
        { id: 'E', display: { expansion: 'Jagged Earth' } },
        { id: 'F', display: { expansion: 'Jagged Earth' } },
      ],
    });
  });

  it('generates scenarios root', () => {
    expect(root.scenarios).toStrictEqual(SCENARIOS_ROOT);
  });

  it('generates adversaries root', () => {
    expect(root.adversaries).toStrictEqual(ADVERSARIES_ROOT);
  });
});
