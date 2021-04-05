import { List, Avatar, Button, Alert, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Layout } from 'components/Layout/Layout';
import { ROUTE_HREF } from 'utils/routes';
import { EmployeesBreadcrumbs } from './components/EmployeesBreadcrumbs/EmployeesBreadcrumbs';
import { getFullName } from 'selectors/getFullName';
import { EMPLOYEES_DOCUMENT, PeopleQuery, Employee } from './Employees.graphql';

export const Employees = () => {
  const { data, error, loading } = useQuery<PeopleQuery>(EMPLOYEES_DOCUMENT);
  if (error) {
    return (
      <Layout toolbar={<EmployeesBreadcrumbs />}>
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

  return (
    <Layout toolbar={<EmployeesBreadcrumbs />}>
      <List
        loading={{
          spinning: loading,
          indicator: (
            <div role="progressbar">
              <Spin />
            </div>
          ),
        }}
        dataSource={data?.people}
        rowKey={getEmailTypeSafe}
        renderItem={(item, index) => (
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
