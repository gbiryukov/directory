import { Typography } from 'antd';
import { getFullName } from 'selectors/getFullName';
import './EmployeeInfo.css';

type EmployeeInfoProps = {
  employee: {
    name?: {
      title?: string | null;
      first?: string | null;
      last?: string | null;
    } | null;
    email?: string | null;
  };
};

export const EmployeeInfo = (props: EmployeeInfoProps) => {
  const { name, email } = props.employee;

  return (
    <>
      <Typography.Title level={2}>{getFullName(name)}</Typography.Title>
      <Typography.Paragraph className="employee-info__last-item">{email}</Typography.Paragraph>
    </>
  );
};
