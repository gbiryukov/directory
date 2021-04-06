import { EmployeesFieldsFragment } from 'api/generated';

export function hasSearchMatch(search: string, employee: EmployeesFieldsFragment): boolean {
  const terms = search.split(/\s/);
  const termsRegexps = terms.map((term) => new RegExp(term, 'i'));

  let values = [employee.email];
  if (employee.name) {
    values = values.concat(Object.values(employee.name));
  }

  // ensure that employee fields contains all search terms
  return termsRegexps.every((termRegexp) =>
    values.some((value) => value && termRegexp.test(value))
  );
}
