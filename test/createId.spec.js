const {createId} = require('../index');

describe('createId', () => {
  describe('With default options', () => {
    test('One chain link is converted to a string with one chain link', () => {
      const chainId = createId();
      expect(`${chainId.level1}`).toEqual('level1');
    });

    test('Multiple chain links are converted to a string with multiple chain links', () => {
      const chainId = createId();
      expect(`${chainId.level1.level2}`).toEqual('level1-level2');
    });

    test('When accessing the same property, the same value is returned', () => {
      const chainId = createId();
      expect(chainId.level1 === chainId.level1).toBeTruthy();
    });
  });

  describe('With custom options', () => {
    test('Separator works', () => {
      const chainId = createId({separator: '.'});
      expect(`${chainId.level1.level2}`).toEqual('level1.level2');
    });

    test('Prefix works', () => {
      const chainId = createId({prefix: 'chainId'});
      expect(`${chainId.level1.level2}`).toEqual('chainId-level1-level2');
    });

    test('Undefined when the key is ignored', () => {
      const chainId = createId({ignoreKeys: ['ignoredKey']});
      expect(chainId.ignoredKey).toEqual(undefined);
    });
  });
});
