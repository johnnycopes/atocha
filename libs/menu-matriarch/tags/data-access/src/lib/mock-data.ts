import { createTagDto } from './create-tag-dto';

export const TAG_DTOS = [
  createTagDto({
    id: 'tag-1',
    uid: 'abc',
    name: 'Vegetarian',
    dishIds: ['dish-1', 'dish-2'],
    mealIds: ['meal-1'],
  }),
];
