import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { Highlight } from "../types/Article";
import Icon from "./Icon";

interface HighlightProps {
  highlight: Highlight;
  onDeleteHighlight?: () => void;
  onClick?: () => void;
  fullWidth?: boolean;
}

interface ContainerProps {
  fullWidth?: boolean;
}

const Container = styled.div<ContainerProps>`
   {
    width: ${(props) => (props.fullWidth ? "auto" : "300px")};
    border-radius: 10px;
    padding: 5px 30px;
    background-color: var(--purple-medium-transparent);
    color: white;
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
}: HighlightProps) => {
  return (
    <Container onClick={onClick} fullWidth={fullWidth}>
      <Text>{highlight.text}</Text>
      {onDeleteHighlight && (
        <Icon onClick={onDeleteHighlight}>
          <FaRegTrashAlt />
        </Icon>
      )}
    </Container>
  );
};

export default HighlightThumbnail;
