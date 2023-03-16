import { useState } from "react";
import styled from "styled-components";
import { Highlight } from "../types/Article";
import HighlightThumbnail from "./HighlightThumbnail";

interface ArticleHighlightsProps {
  title: string;
  highlights: Highlight[];
  selectHighlight: (highlight: Highlight) => void;
}

const Container = styled.div`
   {
    width: auto;
    border-radius: 10px;
    padding: 5px 30px;
    color: var(--black);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    gap: 20px;
  }
`;
const List = styled.div`
   {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
const ArticleHighlights = ({
  title,
  highlights,
  selectHighlight,
}: ArticleHighlightsProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Container onClick={() => setIsOpen(!isOpen)}>
      <h3>{title}</h3>
      {isOpen && (
        <List>
          {highlights.map((highlight) => (
            <HighlightThumbnail
              key={highlight.id}
              highlight={highlight}
              onClick={() => selectHighlight(highlight)}
            />
          ))}
        </List>
      )}
    </Container>
  );
};

export default ArticleHighlights;
