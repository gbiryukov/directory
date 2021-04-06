import { Input as AntInput, Typography } from 'antd';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import './Input.css';

type InputProps = {
  input: FieldInputProps<string>;
  meta: FieldMetaState<string>;
  label: string;
};

export const Input = (props: InputProps) => {
  const {
    input,
    meta: { error, dirty, touched, active },
    label,
  } = props;

  return (
    <div className="input">
      <label htmlFor={input.name}>
        <Typography.Text type="secondary">{label}</Typography.Text>
      </label>
      <AntInput {...input} id={input.name} />
      {((!active && dirty) || touched) && error && (
        <Typography.Text className="input__error" type="danger">
          {error}
        </Typography.Text>
      )}
    </div>
  );
};
