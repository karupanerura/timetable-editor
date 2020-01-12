import { range } from './array';

test('range', () => {
  expect(Array.from(range(2, 5))).toStrictEqual([2, 3, 4, 5]);
});

test('range with interval', () => {
  expect(Array.from(range(2, 5, 2))).toStrictEqual([2, 4]);
});
