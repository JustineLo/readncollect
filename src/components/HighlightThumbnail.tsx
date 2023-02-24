import styled from "styled-components";
import { Highlight } from "../types/Article";
import { FaRegTrashAlt } from "react-icons/fa";

interface HighlightProps {
  highlight: Highlight;
  onDeleteHighlight: () => void;
}

const Container = styled.div`
   {
    width: 300px;
    max-height: 150px;
    border-radius: 10px;
    padding: 5px 30px;
    background-color: pink;
    overflow: scroll;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
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
        <button onClick={onDeleteHighlight}>
          <FaRegTrashAlt />
        </button>
      </Buttons>
    </Container>
  );
};

export default HighlightThumbnail;
