import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonContainer = styled.button`
  padding: 10px 20px;
  border-radius: 40px;
  border: 1px solid var(--primary-dark);
  background: var(--primary);
  color: var(--black);
  cursor: pointer;
`;

const Button = ({ children, type, onClick, disabled }: ButtonProps) => {
  return (
    <ButtonContainer disabled={disabled} type={type} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
