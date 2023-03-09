import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { Highlight } from "../types/Article";
import Icon from "./Icon";

interface HighlightProps {
  highlight: Highlight;
  onDeleteHighlight?: () => void;
  draggable: boolean;
}

const Container = styled.div<{ draggable: boolean }>`
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
    ${({ draggable }) => draggable && `user-drag: element;`}
  }
`;
const Text = styled.div`
   {
  }
`;

const Buttons = styled.div`
   {
  }
`;

const HighlightThumbnail = ({
  highlight,
  onDeleteHighlight,
  draggable,
}: HighlightProps) => {
  function onDragStart(e: any, text: string): void {
    e.preventDefau;
    lt();
  }
  return (
    <Container
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, highlight.text)}
    >
      <Text>
        <p>{highlight.text}</p>
      </Text>
      {onDeleteHighlight && (
        <Buttons>
          <Icon onClick={onDeleteHighlight}>
            <FaRegTrashAlt />
          </Icon>
        </Buttons>
      )}
    </Container>
  );
};

export default HighlightThumbnail;
