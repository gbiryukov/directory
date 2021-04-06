import { ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { EmployeesBreadcrumbs } from 'pages/Employees/components/EmployeesBreadcrumbs/EmployeesBreadcrumbs';
import { ROUTE_HREF } from 'utils/routes';
import { getFullName } from 'selectors/getFullName';
import { useEmployeeQuery } from 'api/generated';

type EmployeesBreadcrumbsProps = {
  email: string;
  children?: ReactNode;
};

export const EmployeeBreadcrumbs = (props: EmployeesBreadcrumbsProps) => {
  const { email, children } = props;
  const { data } = useEmployeeQuery({
    variables: {
      email,
    },
    fetchPolicy: 'cache-only',
  });

  return (
    <EmployeesBreadcrumbs>
      <Breadcrumb.Item>
        <Link to={ROUTE_HREF.employee({ id: encodeURIComponent(email) })}>
          {getFullName(data?.person?.name)}
        </Link>
      </Breadcrumb.Item>
      {children}
    </EmployeesBreadcrumbs>
  );
};
