const {createIdFromScheme} = require('../index');

function getScheme() {
  return {
    a: {
      a1: {
        a11: 'end1',
        a12: {
          a121: 0,
          a122: 'end2'
        }
      },
      a2: {
        a21: '',
      }
    },
    b: {
      b1: '',
      b2: 'end3'
    }
  }
}

describe('createIdFromScheme', () => {
  describe('With default options', () => {
    test('equal', () => {
      const id = createIdFromScheme(getScheme());
      [
        [id.a, 'a'],
        [id.a.a1, 'a-a1'],
        [id.a.a1.a12.a121, 'a-a1-a12-a121-0'],
        [id.a.a1.a12.a122, 'a-a1-a12-a122-end2'],
        [id.a.a2.a21, 'a-a2-a21'],
        [id.b, 'b'],
        [id.b.b2, 'b-b2-end3'],
      ].forEach(([id, expected]) => expect(String(id)).toEqual(expected));
    });
  });

  describe('With custom options', () => {
    test('equal', () => {
      const id = createIdFromScheme(getScheme(), {prefix: 'id', separator: '.'});
      [
        [id.a, 'id.a'],
        [id.a.a1, 'id.a.a1'],
        [id.a.a1.a12.a121, 'id.a.a1.a12.a121.0'],
        [id.a.a1.a12.a122, 'id.a.a1.a12.a122.end2'],
        [id.b, 'id.b'],
        [id.b.b2, 'id.b.b2.end3'],
      ].forEach(([id, expected]) => expect(String(id)).toEqual(expected));
    });
  });
});
