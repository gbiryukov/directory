import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedResponse } from '@apollo/client/testing';
import { renderInAppContext } from 'utils/tests';
import { Employees } from './Employees';
import { EMPLOYEES_DOCUMENT, PeopleQuery } from './Employees.graphql';

test('renders employees list with loader', async () => {
  const employees = [
    {
      name: {
        first: 'Foo',
        last: 'Bar',
      },
      email: 'foo2@bar.com',
    },
  ];

  const EMPLOYEES_MOCK: MockedResponse<PeopleQuery> = {
    request: {
      query: EMPLOYEES_DOCUMENT,
    },
    result: {
      data: {
        people: employees,
      },
    },
  };

  renderInAppContext([EMPLOYEES_MOCK], <Employees />);

  const loaderEl = screen.getByRole('progressbar');
  expect(loaderEl).toBeInTheDocument();

  const employeeItems = await screen.findAllByText('View');
  expect(employeeItems.length).toBe(employees.length);
});

test('renders error', async () => {
  const EMPLOYEES_MOCK: MockedResponse<PeopleQuery> = {
    request: {
      query: EMPLOYEES_DOCUMENT,
    },
    error: new Error('Network error'),
  };

  renderInAppContext([EMPLOYEES_MOCK], <Employees />);

  const errorEl = await screen.findByText(/oops/i);

  expect(errorEl).toBeInTheDocument();
});

test('filter employees', async () => {
  const employees = [
    {
      name: {
        first: 'Foo',
        last: 'Bar',
      },
      email: 'foo2@bar.com',
    },
    {
      name: {
        first: 'Bob',
        last: 'Bar',
      },
      email: 'bob@example.com',
    },
    {
      name: {
        first: '111',
        last: '222',
      },
      email: '333@444.555',
    },
  ];

  const EMPLOYEES_MOCK: MockedResponse<PeopleQuery> = {
    request: {
      query: EMPLOYEES_DOCUMENT,
    },
    result: {
      data: {
        people: employees,
      },
    },
  };

  renderInAppContext([EMPLOYEES_MOCK], <Employees />);

  const employeeItems = await screen.findAllByText('View');
  expect(employeeItems.length).toBe(employees.length);

  const searchEl = screen.getByPlaceholderText('Search...');
  fireEvent.change(searchEl, {
    target: {
      value: 'foo',
    },
  });

  await waitFor(() => expect(screen.getAllByText('View').length).toBe(1));

  fireEvent.input(searchEl, {
    target: {
      value: 'Bar',
    },
  });

  await waitFor(() => expect(screen.getAllByText('View').length).toBe(2));
});
