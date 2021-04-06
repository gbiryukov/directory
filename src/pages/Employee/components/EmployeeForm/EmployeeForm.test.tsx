import { screen } from '@testing-library/react';
import { renderInAppContext } from 'utils/tests';
import { EmployeeForm } from './EmployeeForm';

const employee = {
  name: {
    title: 'Mr',
    first: 'Foo',
    last: 'Bar',
  },
  email: 'foo@bar.com',
  picture: {
    large: 'https://foo.bar/baz.jpg',
  },
};

test('pre-populates form with initial values', async () => {
  renderInAppContext(
    [],
    <EmployeeForm employee={employee} onCancel={() => {}} onSubmit={() => Promise.resolve()} />
  );

  screen.getByDisplayValue(employee.name.title);
  screen.getByDisplayValue(employee.name.first);
  screen.getByDisplayValue(employee.name.last);
  screen.getByDisplayValue(employee.email);
});
