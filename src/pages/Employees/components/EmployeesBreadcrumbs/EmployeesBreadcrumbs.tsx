import { ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTE } from 'utils/routes';

type EmployeesBreadcrumbsProps = {
  children?: ReactNode;
};

export const EmployeesBreadcrumbs = (props: EmployeesBreadcrumbsProps) => {
  const { children } = props;

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={ROUTE.root}>
          <HomeOutlined />
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={ROUTE.employees}>Employees</Link>
      </Breadcrumb.Item>
      {children}
    </Breadcrumb>
  );
};
