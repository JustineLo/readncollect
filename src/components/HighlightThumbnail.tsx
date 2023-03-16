import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { Highlight } from "../types/Article";
import Icon from "./Icon";

interface HighlightProps {
  highlight: Highlight;
  onDeleteHighlight?: () => void;
  onClick?: () => void;
  fullWidth?: boolean;
  backgroundColor?: string;
}

interface ContainerProps {
  fullWidth?: boolean;
  backgroundColor?: string;
}

const Container = styled.div<ContainerProps>`
   {
    width: ${(props) => (props.fullWidth ? "auto" : "300px")};
    border-radius: 10px;
    padding: 5px 30px;
    background-color: ${(props) => props.backgroundColor || "var(--secondary)"};
    color: var(--black);
    border: 3px solid var(--secondary-dark);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    gap: 20px;
  }
`;
const Text = styled.p`
   {
  }
`;

const HighlightThumbnail = ({
  highlight,
  onDeleteHighlight,
  onClick,
  fullWidth,
  backgroundColor,
}: HighlightProps) => {
  return (
    <Container
      onClick={onClick}
      fullWidth={fullWidth}
      backgroundColor={backgroundColor}
    >
      <Text>{highlight.text}</Text>
      {onDeleteHighlight && (
        <Icon onClick={onDeleteHighlight}>
          <FaRegTrashAlt color="var(--black)" />
        </Icon>
      )}
    </Container>
  );
};

export default HighlightThumbnail;
