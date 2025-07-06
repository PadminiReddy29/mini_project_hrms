/*import { Input } from "antd";

const InputComponent = (props) => {
    const {placeholder,onChange, name, label}=props;

    return (
<div className= "Input_row">
 <label><b>{label} </b></label>
<Input placeholder={placeholder} name={name} onChange={onChange} />
</div>
    )
}
export default InputComponent;*/

import { Form, Input, Typography } from 'antd';

const TextInput = ({ label, name, placeholder, password = false, rules, onChange, extra }) => {
  const Component = password ? Input.Password : Input;

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules || [{ required: true, message: `${label} is required` }]}
      extra={extra}
    >
      <Component placeholder={placeholder} onChange={onChange} />
    </Form.Item>
  );
};

export default TextInput;


