import { TodoForm } from './form';

describe('TodoForm', () => {
  let form: TodoForm;

  beforeEach(() => {
    form = new TodoForm({
      userId: '',
      title: '',
      completed: false,
    });
  });

  it('renders', () => {
    expect(form).toBeTruthy();
  });

  describe('userId', () => {
    it('has error if blank', () => {
      expect(form.userIdError).toBe('User ID is required');
    });

    it('has no error if filled out', () => {
      form.patchValue({ userId: '3' });

      expect(form.userIdError).toBe('');
    });
  });

  describe('title', () => {
    it('has error if blank', () => {
      expect(form.titleError).toBe('Title is required');
    });

    it('has no error if filled out', () => {
      form.patchValue({ title: 'My task' });

      expect(form.titleError).toBe('');
    });
  });

  describe('completed', () => {
    it('is valid if true', () => {
      form.patchValue({ completed: true });

      expect(form.controls.completed.valid).toBe(true);
    });

    it('is valid if false', () => {
      form.patchValue({ completed: false });

      expect(form.controls.completed.valid).toBe(true);
    });
  });

  it('is valid only if all fields are filled out', () => {
    form.patchValue({
      userId: '2',
      title: 'My task',
    });

    expect(form.valid).toBe(true);
  });
});
