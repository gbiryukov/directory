import { useState } from 'react';
import { List, Avatar, Button, Alert, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Layout } from 'components/Layout/Layout';
import { ROUTE_HREF } from 'utils/routes';
import { getFullName } from 'selectors/getFullName';
import { EmployeesBreadcrumbs } from './components/EmployeesBreadcrumbs/EmployeesBreadcrumbs';
import { EmployeesSearch } from './components/EmployeesSearch/EmployeesSearch';
import { EMPLOYEES_DOCUMENT, PeopleQuery, Employee } from './Employees.graphql';
import './Employees.css';

export const Employees = () => {
  const { data, error, loading } = useQuery<PeopleQuery>(EMPLOYEES_DOCUMENT);

  const [search, setSearch] = useState('');

  const renderToolBar = () => (
    <div className="employees__toolbar">
      <EmployeesBreadcrumbs />
      <EmployeesSearch className="employees__search" onChange={setSearch} />
    </div>
  );

  if (error) {
    return (
      <Layout toolbar={renderToolBar()}>
        <Alert type="error" message="Oops something went wrong, please try to refresh the page" />
      </Layout>
    );
  }

  const getEmailTypeSafe = ({ email }: Employee): string => {
    if (!email) {
      throw new Error('Can not identify employee');
    }

    return email;
  };

  const filterEmployees = (employee: Employee): boolean => {
    if (!search) {
      return true;
    }

    const terms = search.split(/\s/);
    const searchRegexps = terms.map((term) => new RegExp(term, 'i'));

    let values = [employee.email];
    if (employee.name) {
      values = values.concat(Object.values(employee.name));
    }

    // ensure that employee fields contains all search terms
    return searchRegexps.every((termRegexp) =>
      values.some((value) => value && termRegexp.test(value))
    );
  };

  return (
    <Layout toolbar={renderToolBar()}>
      <List
        loading={{
          spinning: loading,
          indicator: (
            <div role="progressbar">
              <Spin />
            </div>
          ),
        }}
        dataSource={(data?.people || []).filter(filterEmployees)}
        rowKey={getEmailTypeSafe}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.picture?.thumbnail} />}
              title={getFullName(item.name)}
              description={
                <Typography.Paragraph type="secondary" ellipsis={true}>
                  {item.email}
                </Typography.Paragraph>
              }
            />
            <Link
              className="employees__view"
              to={ROUTE_HREF.employee({ id: encodeURIComponent(getEmailTypeSafe(item)) })}
            >
              <Button type="primary">View</Button>
            </Link>
          </List.Item>
        )}
      />
    </Layout>
  );
};
