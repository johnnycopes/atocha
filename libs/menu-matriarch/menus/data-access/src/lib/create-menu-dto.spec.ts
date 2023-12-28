import { createMenuDto } from './create-menu-dto';

describe('createMenuDto', () => {
  it('creates default menu when no arguments are passed in', () => {
    const menu = createMenuDto({});
    expect(menu).toStrictEqual({
      contents: {
        Friday: [],
        Monday: [],
        Saturday: [],
        Sunday: [],
        Thursday: [],
        Tuesday: [],
        Wednesday: [],
      },
      favorited: false,
      id: '',
      name: '',
      startDay: 'Monday',
      uid: '',
    });
  });

  it('creates menu when arguments are passed in', () => {
    const menu = createMenuDto({
      id: '1',
      uid: 'A2',
      name: 'Bob',
      favorited: true,
      startDay: 'Saturday',
      contents: {
        Monday: [],
        Tuesday: ['1'],
        Wednesday: [],
        Thursday: ['2'],
        Friday: [],
        Saturday: [],
        Sunday: ['3'],
      },
    });
    expect(menu).toStrictEqual({
      id: '1',
      uid: 'A2',
      name: 'Bob',
      favorited: true,
      startDay: 'Saturday',
      contents: {
        Monday: [],
        Tuesday: ['1'],
        Wednesday: [],
        Thursday: ['2'],
        Friday: [],
        Saturday: [],
        Sunday: ['3'],
      },
    });
  });
});
