import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  square?: boolean;
  border?: string;
  textColor?: string;
}

const ButtonContainer = styled.button<{
  backgroundColor: string | undefined;
  square: boolean | undefined;
  border: string | undefined;
  textColor: string | undefined;
}>`
  padding: 10px 15px;
  font-weight: 300;
  border-radius: ${(props) => (props.square ? "8px" : "40px")};
  border: 2px solid ${(props) => props.border || "var(--primary)"};
  background: ${(props) => props.backgroundColor || "var(--primary)"};
  color: ${(props) => props.textColor || "var(--primary-text)"};
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
  border,
  textColor,
}: ButtonProps) => {
  return (
    <ButtonContainer
      className={disabled ? "disabled" : ""}
      disabled={disabled}
      type={type}
      onClick={onClick}
      backgroundColor={backgroundColor}
      square={square}
      border={border}
      textColor={textColor}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
