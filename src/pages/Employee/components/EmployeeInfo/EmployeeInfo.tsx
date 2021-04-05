import { Typography } from 'antd';
import { getFullName } from 'selectors/getFullName';

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
      <Typography.Paragraph>{email}</Typography.Paragraph>
    </>
  );
};
