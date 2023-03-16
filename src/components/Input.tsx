import styled from "styled-components";

interface InputProps {
  type: string;
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
}

const InputContainer = styled.input`
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid var(--secondary);
  background: var(--secondary-light);
  min-width: 300px;
`;

const Input = ({ type, value, onChange, placeholder }: InputProps) => {
  return (
    <InputContainer
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    ></InputContainer>
  );
};

export default Input;
