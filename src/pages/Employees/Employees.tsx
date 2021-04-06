import { useState } from 'react';
import { List, Avatar, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import { PagePlaceholder } from 'components/PagePlaceholder/PagePlaceholder';
import { useEmployeesQuery, EmployeesFieldsFragment } from 'api/generated';
import { ROUTE_HREF } from 'utils/routes';
import { getFullName } from 'selectors/getFullName';
import { EmployeesBreadcrumbs } from './components/EmployeesBreadcrumbs/EmployeesBreadcrumbs';
import { EmployeesSearch } from './components/EmployeesSearch/EmployeesSearch';
import './Employees.css';

export const Employees = () => {
  const { data, error, loading } = useEmployeesQuery();

  const [search, setSearch] = useState('');

  const renderToolBar = () => (
    <div className="employees__toolbar">
      <EmployeesBreadcrumbs />
      <EmployeesSearch
        className="employees__search"
        onChange={setSearch}
        isDisabled={Boolean(loading || error)}
      />
    </div>
  );

  if (loading || error || !data) {
    return (
      <PagePlaceholder
        toolbar={renderToolBar()}
        isError={Boolean(error || !data)}
        isLoading={loading}
      />
    );
  }

  const getEmailTypeSafe = ({ email }: EmployeesFieldsFragment): string => {
    if (!email) {
      throw new Error('Can not identify employee');
    }

    return email;
  };

  const filterEmployees = (
    employee?: EmployeesFieldsFragment | null
  ): employee is EmployeesFieldsFragment => {
    if (!employee) {
      return false;
    }

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
        dataSource={(data.people || []).filter<EmployeesFieldsFragment>(filterEmployees)}
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
