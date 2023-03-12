import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { Highlight } from "../types/Article";
import Icon from "./Icon";

interface HighlightProps {
  highlight: Highlight;
  onDeleteHighlight?: () => void;
  onClick?: () => void;
}

const Container = styled.div`
   {
    width: 300px;
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
}: HighlightProps) => {
  return (
    <Container onClick={onClick}>
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
