const {createId} = require('../index');

describe('createId', () => {
  describe('With default options', () => {
    test('Single level', () => {
      const testId = createId();
      expect(`${testId.level1}`).toEqual('level1');
    });

    test('Few levels', () => {
      const testId = createId();
      expect(`${testId.level1.level2}`).toEqual('level1-level2');
    });

    test('Levels equal', () => {
      const testId = createId();
      expect(testId.level1 === testId.level1).toBeTruthy();
    });
  });

  describe('With custom options', () => {
    test('Separator === "."', () => {
      const testId = createId({separator: '.'});
      expect(`${testId.level1.level2}`).toEqual('level1.level2');
    });

    test('Prefix === "testId"', () => {
      const testId = createId({prefix: 'testId'});
      expect(`${testId.level1.level2}`).toEqual('testId-level1-level2');
    });
  });
});
