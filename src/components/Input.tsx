import styled from "styled-components";

interface InputProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputContainer = styled.input`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid var(--purple-medium);
  background: rgba(25, 4, 64, 0.8);
  min-width: 300px;
`;

const Input = ({ type, value, onChange, placeholder }: InputProps) => {
  return (
    <InputContainer
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    ></InputContainer>
  );
};

export default Input;
