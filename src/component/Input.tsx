import { FC, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
}

const InputField: FC<InputFieldProps> = ({ label, id, name, ...rest }) => {
  return (
    <div className="inputField">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} name={name} {...rest} />
    </div>
  );
};

export default InputField;
