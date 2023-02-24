import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
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
`;

const Button = ({ children, type }: ButtonProps) => {
  return <ButtonContainer type={type}>{children}</ButtonContainer>;
};

export default Button;
