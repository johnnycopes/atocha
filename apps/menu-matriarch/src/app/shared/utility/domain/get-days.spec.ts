import { getDays } from './get-days';

describe('getDays', () => {
  it('returns days of the week in order starting on Monday by default', () => {
    expect(getDays()).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  });

  it('returns all days starting on Monday', () => {
    expect(getDays('Monday')).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  });

  it('returns all days starting on Tuesday', () => {
    expect(getDays('Tuesday')).toEqual(['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday']);
  });

  it('returns all days starting on Wednesday', () => {
    expect(getDays('Wednesday')).toEqual(['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday']);
  });

  it('returns all days starting on Thursday', () => {
    expect(getDays('Thursday')).toEqual(['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday']);
  });

  it('returns all days starting on Friday', () => {
    expect(getDays('Friday')).toEqual(['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']);
  });

  it('returns all days starting on Saturday', () => {
    expect(getDays('Saturday')).toEqual(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  });

  it('returns all days starting on Sunday', () => {
    expect(getDays('Sunday')).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  });
});
