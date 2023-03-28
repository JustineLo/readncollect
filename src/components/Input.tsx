import { ChangeEvent } from "react";
import styled from "styled-components";

interface InputProps {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
}

const InputContainer = styled.input<{ width: string | undefined }>`
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid var(--secondary);
  background: var(--secondary-light);
  min-width: 300px;
  width: ${(props) => (props.width ? props.width : "300px")};
  color: var(--grey);
`;

const Input = ({ type, value, onChange, placeholder, width }: InputProps) => {
  return (
    <InputContainer
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      width={width}
    />
  );
};

export default Input;
