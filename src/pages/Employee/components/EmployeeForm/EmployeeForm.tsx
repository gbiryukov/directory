import { Button, Typography } from 'antd';
import { Form } from 'react-final-form';
import createFocusDecorator from 'final-form-focus';
import { InputField } from 'components/InputField/InputField';
import './EmployeeForm.css';

type EmployeeFormValue = {
  title?: string;
  first?: string;
  last?: string;
  email?: string;
};

type EmployeeInfoProps = {
  onSubmit: (value: EmployeeFormValue) => Promise<void | Record<string, string>>;
  onCancel: () => void;
  employee: {
    name?: {
      title?: string | null;
      first?: string | null;
      last?: string | null;
    } | null;
    email?: string | null;
  };
};

const focusDecorator = createFocusDecorator();

export const EmployeeForm = (props: EmployeeInfoProps) => {
  const {
    employee: { name, email },
    onSubmit,
    onCancel,
  } = props;

  return (
    <Form<EmployeeFormValue>
      onSubmit={onSubmit}
      decorators={[focusDecorator]}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit}>
          <InputField name="title" label="Title" initialValue={name?.title} />
          <InputField name="first" label="First Name" initialValue={name?.first} />
          <InputField name="last" label="Last Name" initialValue={name?.last} />
          <InputField name="email" label="Email" initialValue={email} />
          {submitError && <Typography.Text type="danger">{submitError}</Typography.Text>}
          <div className="employee-form__actions">
            <Button type="primary" htmlType="submit" loading={submitting}>
              Save
            </Button>
            <Button disabled={submitting} className="employee-form__cancel" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    />
  );
};
