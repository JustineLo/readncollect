import { useState } from "react";
import styled from "styled-components";
import { Highlight } from "../types/Article";
import Chevron from "./Chevron";
import HighlightThumbnail from "./HighlightThumbnail";

interface ArticleHighlightsProps {
  title: string;
  highlights: Highlight[];
  selectHighlight: (highlight: Highlight) => void;
}

const Container = styled.div`
   {
    border-radius: 10px;
    color: var(--black);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 200px;

    gap: 20px;
    border: 1px solid var(--primary);
    overflow: hidden;
    box-sizing: border-box;

    @media (min-width: 768px) {
      width: 100%;
    }
  }
`;

const Header = styled.div`
   {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary);
    font-size: 0.8rem;
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;

    h3 {
      text-align: center;
    }

    svg {
      display: none;
    }

    @media (min-width: 768px) {
      padding: 0 20px 0 50px;
      font-size: 1rem;
      justify-content: space-between;

      h3 {
        text-align: start;
      }

      svg {
        display: flex;
      }
    }
  }
`;

const List = styled.div`
   {
    display: none;

    @media (min-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 40px;
    }
  }
`;
const ArticleHighlights = ({
  title,
  highlights,
  selectHighlight,
}: ArticleHighlightsProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Container>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <Chevron isDown={!isOpen} size="30px" />
      </Header>

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
