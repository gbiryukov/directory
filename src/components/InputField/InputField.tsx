import { Field, FieldProps, FieldRenderProps } from 'react-final-form';
import { Input } from 'components/Input/Input';
import { isRequired } from './validators/isRequired';

type InputFieldProps<Value> = Omit<FieldProps<Value, FieldRenderProps<Value>>, 'render'> & {
  label: string;
};

export const InputField = (props: InputFieldProps<string>) => {
  const { label, validate = isRequired, name, ...fieldProps } = props;

  return (
    <Field
      name={name}
      render={(renderProps) => <Input {...renderProps} label={label} />}
      validate={validate}
      {...fieldProps}
    />
  );
};
