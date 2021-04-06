import { hasSearchMatch } from './hasSearchMatch';

const employee = {
  name: {
    title: 'Mr',
    first: 'Foo',
    last: 'Bar',
  },
  email: 'foo2@bar.com',
};

test('handles empty names', () => {
  expect(hasSearchMatch('mr', employee)).toBe(true);
  expect(hasSearchMatch('mr foo', employee)).toBe(true);
  expect(hasSearchMatch('mr bar', employee)).toBe(true);
  expect(hasSearchMatch('foo bar', employee)).toBe(true);
  expect(hasSearchMatch('bar foo2', employee)).toBe(true);
  expect(hasSearchMatch(employee.email, employee)).toBe(true);
  expect(hasSearchMatch('', employee)).toBe(true);
  expect(hasSearchMatch(' ', employee)).toBe(true);

  expect(hasSearchMatch('kek', employee)).toBe(false);
});
