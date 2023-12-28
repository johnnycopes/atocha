import { getDays } from './get-days';

describe('getDays', () => {
  it('returns days of the week in order starting on Monday by default', () => {
    expect(getDays()).toStrictEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
  });

  it('returns all days starting on Monday', () => {
    expect(getDays('Monday')).toStrictEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
  });

  it('returns all days starting on Tuesday', () => {
    expect(getDays('Tuesday')).toStrictEqual([
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
    ]);
  });

  it('returns all days starting on Wednesday', () => {
    expect(getDays('Wednesday')).toStrictEqual([
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
    ]);
  });

  it('returns all days starting on Thursday', () => {
    expect(getDays('Thursday')).toStrictEqual([
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
    ]);
  });

  it('returns all days starting on Friday', () => {
    expect(getDays('Friday')).toStrictEqual([
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
    ]);
  });

  it('returns all days starting on Saturday', () => {
    expect(getDays('Saturday')).toStrictEqual([
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ]);
  });

  it('returns all days starting on Sunday', () => {
    expect(getDays('Sunday')).toStrictEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });
});
