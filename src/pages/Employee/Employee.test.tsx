import { screen } from '@testing-library/react';
import { MockedResponse } from '@apollo/client/testing';
import { renderInAppContext } from 'utils/tests';
import { ROUTE, ROUTE_HREF } from 'utils/routes';
import { Employee } from './Employee';
import { EMPLOYEE_DOCUMENT, EmployeeQuery } from './Employee.graphql';
import { Route } from 'react-router-dom';

const employee = {
  name: {
    first: 'Foo',
    last: 'Bar',
  },
  email: 'foo@bar.com',
  picture: {
    large: 'https://foo.bar/baz.jpg',
  },
};

test('renders employee', async () => {
  const EMPLOYEE_MOCK: MockedResponse<EmployeeQuery> = {
    request: {
      query: EMPLOYEE_DOCUMENT,
      variables: {
        email: employee.email,
      },
    },
    result: {
      data: {
        person: employee,
      },
    },
  };

  renderInAppContext(
    [EMPLOYEE_MOCK],
    <Route path={ROUTE.employee}>
      <Employee />
    </Route>,
    {
      initialEntries: [ROUTE_HREF.employee({ id: encodeURIComponent(employee.email) })],
    }
  );

  const loaderEl = screen.getByRole('progressbar');
  expect(loaderEl).toBeInTheDocument();

  const employeeElement = await screen.findByText(employee.email);
  expect(employeeElement).toBeInTheDocument();
});
