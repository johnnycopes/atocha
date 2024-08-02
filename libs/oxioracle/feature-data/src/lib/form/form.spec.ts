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
    it('is valid if blank and untouched', () => {
      expect(form.userIdError).toBe(false);
    });

    it('is valid if filled out', () => {
      form.patchValue({ userId: '3' });

      expect(form.userIdError).toBe(false);
    });

    it('has error if blank and touched', () => {
      form.userId.markAsTouched();

      expect(form.userIdError).toBe(true);
    });
  });

  describe('title', () => {
    it('is valid if blank and untouched', () => {
      expect(form.titleError).toBe(false);
    });

    it('is valid if filled out', () => {
      form.patchValue({ title: 'My task' });

      expect(form.titleError).toBe(false);
    });

    it('has error if blank and touched', () => {
      form.title.markAsTouched();

      expect(form.titleError).toBe(true);
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
