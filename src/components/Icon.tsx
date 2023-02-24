import styled from "styled-components";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const IconButtonContainer = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  outline: none;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
`;

const Icon = ({ children, onClick }: IconButtonProps) => {
  return (
    <IconButtonContainer onClick={onClick}>{children}</IconButtonContainer>
  );
};

export default Icon;