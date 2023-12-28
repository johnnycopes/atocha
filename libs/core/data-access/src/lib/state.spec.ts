import { State } from './state';

describe(State, () => {
  it('reveals the entire state object as an observable', (done) => {
    const person = new State({ name: 'Billy', age: 19 });

    person.get().subscribe((value) => {
      expect(value).toStrictEqual({
        name: 'Billy',
        age: 19,
      });
      done();
    });
  });

  it('reveals an individual state object property as an observable', (done) => {
    const person = new State({ name: 'Billy', age: 19 });

    person.getProp('age').subscribe((value) => {
      expect(value).toStrictEqual(19);
      done();
    });
  });

  it('updates the entire state object', (done) => {
    const person = new State({ name: 'Billy', age: 19 });
    person.update({ name: 'William', age: 42 });

    person.get().subscribe((value) => {
      expect(value).toStrictEqual({
        name: 'William',
        age: 42,
      });
      done();
    });
  });

  it('updates an individual state object property', (done) => {
    const person = new State({ name: 'Billy', age: 19 });
    person.updateProp('age', 20);

    person.getProp('age').subscribe((value) => {
      expect(value).toStrictEqual(20);
      done();
    });
  });

  it('transforms the entire state object', (done) => {
    const person = new State({ name: 'Billy', age: 19 });
    person.transform(({ name, age }) => ({
      name: `Mr. ${name}`,
      age: age + 10,
    }));

    person.get().subscribe((value) => {
      expect(value).toStrictEqual({
        name: 'Mr. Billy',
        age: 29,
      });
      done();
    });
  });

  it('transforms an individual state object property', (done) => {
    const person = new State({ name: 'Billy', age: 19 });
    person.transformProp('age', (age) => age + 1);

    person.getProp('age').subscribe((value) => {
      expect(value).toStrictEqual(20);
      done();
    });
  });
});
