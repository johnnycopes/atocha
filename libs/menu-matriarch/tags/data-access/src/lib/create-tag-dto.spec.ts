import { createTagDto } from './create-tag-dto';

describe('createTagDto', () => {
  it('creates default tag when no arguments are passed in', () => {
    const tag = createTagDto({});
    expect(tag).toStrictEqual({
      id: '',
      uid: '',
      name: '',
      color: '',
      mealIds: [],
      dishIds: [],
    });
  });

  it('creates tag when arguments are passed in', () => {
    const tag = createTagDto({
      id: '1',
      uid: '7R',
      name: 'Pescatarian',
      color: 'cadetblue',
      dishIds: ['8', '9'],
      mealIds: ['10'],
    });
    expect(tag).toStrictEqual({
      id: '1',
      uid: '7R',
      name: 'Pescatarian',
      color: 'cadetblue',
      dishIds: ['8', '9'],
      mealIds: ['10'],
    });
  });
});
