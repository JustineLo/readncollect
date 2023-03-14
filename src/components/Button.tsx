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
  border: 1px solid var(--purple-medium);
  background: linear-gradient(
    133deg,
    var(--purple-medium) 0%,
    var(--purple-light) 50%,
    var(--pink) 100%
  );
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
