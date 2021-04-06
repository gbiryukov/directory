import { Typography } from 'antd';
import { getFullName } from 'selectors/getFullName';
import './EmployeeInfo.css';

type EmployeeInfoProps = {
  employee: {
    name?: {
      title?: string;
      first?: string;
      last?: string;
    };
    email?: string;
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
