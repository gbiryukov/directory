import { SyntheticEvent, useState } from 'react';
import { List, Avatar, Button, Alert, Spin, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Layout } from 'components/Layout/Layout';
import { ROUTE_HREF } from 'utils/routes';
import { EmployeesBreadcrumbs } from './components/EmployeesBreadcrumbs/EmployeesBreadcrumbs';
import { getFullName } from 'selectors/getFullName';
import { EMPLOYEES_DOCUMENT, PeopleQuery, Employee } from './Employees.graphql';
import './Employees.css';

export const Employees = () => {
  const { data, error, loading } = useQuery<PeopleQuery>(EMPLOYEES_DOCUMENT);

  const [search, setSearch] = useState('');

  const handleSearchChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value || '');
  };

  const renderToolBar = () => (
    <div className="employees__toolbar">
      <EmployeesBreadcrumbs />
      <Input
        className="employees__search"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
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

    const searchRegexp = new RegExp(search, 'i');
    let terms = [employee.email];
    if (employee.name) {
      terms = terms.concat(Object.values(employee.name));
    }

    return terms.some((term) => term && searchRegexp.test(term));
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
              description={item.email}
            />
            <Link to={ROUTE_HREF.employee({ id: encodeURIComponent(getEmailTypeSafe(item)) })}>
              <Button type="primary">View</Button>
            </Link>
          </List.Item>
        )}
      />
    </Layout>
  );
};
