import { Todo } from '@atocha/oxioracle/util';
import { sortTodos } from './sort-todos';

describe('sortTodos', () => {
  let todos: Todo[];

  beforeEach(() => {
    todos = [
      { id: '1', userId: '1', title: 'First todo', completed: true },
      { id: '2', userId: '1', title: 'Second todo', completed: false },
      { id: '3', userId: '2', title: 'Third todo', completed: true },
    ];
  });

  it('with no direction', () => {
    expect(
      sortTodos(todos, { active: 'ANY KEY', direction: '' })
    ).toStrictEqual([...todos]);
  });

  describe('by ID', () => {
    it('ascending', () => {
      expect(
        sortTodos(todos, { active: 'id', direction: 'asc' })
      ).toStrictEqual([
        { id: '1', userId: '1', title: 'First todo', completed: true },
        { id: '2', userId: '1', title: 'Second todo', completed: false },
        { id: '3', userId: '2', title: 'Third todo', completed: true },
      ]);
    });

    it('descending', () => {
      expect(
        sortTodos(todos, { active: 'id', direction: 'desc' })
      ).toStrictEqual([
        { id: '3', userId: '2', title: 'Third todo', completed: true },
        { id: '2', userId: '1', title: 'Second todo', completed: false },
        { id: '1', userId: '1', title: 'First todo', completed: true },
      ]);
    });
  });

  describe('by user ID', () => {
    it('ascending', () => {
      expect(
        sortTodos(todos, { active: 'userId', direction: 'asc' })
      ).toStrictEqual([
        { id: '1', userId: '1', title: 'First todo', completed: true },
        { id: '2', userId: '1', title: 'Second todo', completed: false },
        { id: '3', userId: '2', title: 'Third todo', completed: true },
      ]);
    });

    it('descending', () => {
      expect(
        sortTodos(todos, { active: 'userId', direction: 'desc' })
      ).toStrictEqual([
        { id: '3', userId: '2', title: 'Third todo', completed: true },
        { id: '1', userId: '1', title: 'First todo', completed: true },
        { id: '2', userId: '1', title: 'Second todo', completed: false },
      ]);
    });
  });

  describe('by title', () => {
    it('ascending', () => {
      expect(
        sortTodos(todos, { active: 'title', direction: 'asc' })
      ).toStrictEqual([
        { id: '1', userId: '1', title: 'First todo', completed: true },
        { id: '2', userId: '1', title: 'Second todo', completed: false },
        { id: '3', userId: '2', title: 'Third todo', completed: true },
      ]);
    });

    it('descending', () => {
      expect(
        sortTodos(todos, { active: 'title', direction: 'desc' })
      ).toStrictEqual([
        { id: '3', userId: '2', title: 'Third todo', completed: true },
        { id: '2', userId: '1', title: 'Second todo', completed: false },
        { id: '1', userId: '1', title: 'First todo', completed: true },
      ]);
    });
  });

  describe('by completed', () => {
    it('ascending', () => {
      expect(
        sortTodos(todos, { active: 'completed', direction: 'asc' })
      ).toStrictEqual([
        { id: '2', userId: '1', title: 'Second todo', completed: false },
        { id: '1', userId: '1', title: 'First todo', completed: true },
        { id: '3', userId: '2', title: 'Third todo', completed: true },
      ]);
    });

    it('descending', () => {
      expect(
        sortTodos(todos, { active: 'completed', direction: 'desc' })
      ).toStrictEqual([
        { id: '1', userId: '1', title: 'First todo', completed: true },
        { id: '3', userId: '2', title: 'Third todo', completed: true },
        { id: '2', userId: '1', title: 'Second todo', completed: false },
      ]);
    });
  });
});
