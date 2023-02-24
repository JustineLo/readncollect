import styled from "styled-components";
import { Highlight } from "../types/Article";
import { FaRegTrashAlt } from "react-icons/fa";
import Icon from "./Icon";

interface HighlightProps {
  highlight: Highlight;
  onDeleteHighlight: () => void;
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
}: HighlightProps) => {
  return (
    <Container>
      <Text>
        <p>{highlight.text}</p>
      </Text>
      <Buttons>
        <Icon onClick={onDeleteHighlight}>
          <FaRegTrashAlt />
        </Icon>
      </Buttons>
    </Container>
  );
};

export default HighlightThumbnail;
