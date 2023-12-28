import { sandboxUtil } from './sandbox-util';

describe('sandboxUtil', () => {
  it('should work', () => {
    expect(sandboxUtil()).toStrictEqual('sandbox-util');
  });
});
