import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  square?: boolean;
}

const ButtonContainer = styled.button<{
  backgroundColor: string | undefined;
  square: boolean | undefined;
}>`
  padding: 10px 15px;
  font-weight: 300;
  border-radius: ${(props) => (props.square ? "8px" : "40px")};
  border: 1px solid var(--primary-dark);
  background: var(--primary);
  color: var(--primary-text);
  cursor: pointer;
  height: fit-content;
  font-family: Fredoka One, Helvetica, Arial, sans-serif;

  .disabled {
    color: var(--black);
  }
`;

const Button = ({
  children,
  type,
  onClick,
  disabled,
  backgroundColor,
  square,
}: ButtonProps) => {
  return (
    <ButtonContainer
      className={disabled ? "disabled" : ""}
      disabled={disabled}
      type={type}
      onClick={onClick}
      backgroundColor={backgroundColor}
      square={square}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
