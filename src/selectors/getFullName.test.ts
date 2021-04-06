import { getFullName } from './getFullName';

test('handles empty names', () => {
  expect(getFullName()).toBe('–');
  expect(getFullName({})).toBe('–');
});

test('handles empty name components', () => {
  expect(
    getFullName({
      title: 'mr',
      first: 'foo',
    })
  ).toBe('mr foo');

  expect(
    getFullName({
      first: 'foo',
      last: 'bar',
    })
  ).toBe('foo bar');
});

test('generates full name', () => {
  expect(
    getFullName({
      title: 'mr',
      first: 'foo',
      last: 'bar',
    })
  ).toBe('mr foo bar');
});
