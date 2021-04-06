import { Button, Typography } from 'antd';
import { Form, Field } from 'react-final-form';
import createFocusDecorator from 'final-form-focus';
import { Input } from 'components/Input/Input';
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
      title?: string;
      first?: string;
      last?: string;
    };
    email?: string;
  };
};

const focusDecorator = createFocusDecorator();

export const EmployeeForm = (props: EmployeeInfoProps) => {
  const {
    employee: { name, email },
    onSubmit,
    onCancel,
  } = props;

  const isRequired = (value?: string) => {
    if (!value) {
      return 'This field is required';
    }
  };

  return (
    <Form<EmployeeFormValue>
      onSubmit={onSubmit}
      decorators={[focusDecorator]}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="title"
            initialValue={name?.title}
            render={(renderProps) => <Input {...renderProps} label="Title" />}
            validate={isRequired}
          />
          <Field
            name="first"
            initialValue={name?.first}
            render={(renderProps) => <Input {...renderProps} label="First Name" />}
            validate={isRequired}
          />
          <Field
            name="last"
            initialValue={name?.last}
            render={(renderProps) => <Input {...renderProps} label="Last Name" />}
            validate={isRequired}
          />
          <Field
            name="email"
            initialValue={email}
            render={(renderProps) => <Input {...renderProps} label="Email" />}
            validate={isRequired}
          />
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
