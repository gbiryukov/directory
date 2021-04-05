import { List, Avatar, Button, Alert, Spin, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Layout } from 'components/Layout/Layout';
import { ROUTE, ROUTE_HREF } from 'utils/routes';
import { getFullName } from 'selectors/getFullName';
import { EMPLOYEES_DOCUMENT, PeopleQuery, Employee } from './Employees.graphql';


export const Employees = () => {
  const { data, error, loading } = useQuery<PeopleQuery>(EMPLOYEES_DOCUMENT);
  if (error) {
    return (
      <Layout>
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
    <Layout
      toolbar={
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={ROUTE.root}>
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ROUTE.employees}>Employees</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      }
    >
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
