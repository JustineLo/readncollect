import styled from "styled-components";

interface TabLinkProps {
  children: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}

const ButtonContainer = styled.button<{ active: boolean }>`
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.active ? "var(--primary)" : "transparent")};
  padding-bottom: 10px;
  background: none;
  outline: none;
  cursor: pointer;
  font-family: Fredoka One, Helvetica, Arial, sans-serif;
  font-size: 1.2rem;
  color: var(--primary-text);
`;

const TabLink = ({ children, active, onClick }: TabLinkProps) => {
  return (
    <ButtonContainer active={active} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

export default TabLink;
