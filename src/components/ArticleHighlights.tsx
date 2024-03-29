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
    height: 100%;
    padding: 0 10px;
    transition: background-color 0.2s ease-in-out;

    h3 {
      margin: 0;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.8rem;
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
        width: auto;
        font-size: 1rem;
        padding: 10px 0;
      }

      svg {
        display: flex;
      }
    }
  }
`;

const Container = styled.div`
   {
    border-radius: 10px;
    color: var(--black);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 100px;
    height: 50px;
    gap: 20px;
    border: 2px solid var(--primary);
    overflow: hidden;
    text-ellipsis: ellipsis;
    box-sizing: border-box;
    transition: border-color 0.2s ease-in-out;

    &:hover{
      border-color: var(--primary-dark);
    }

    &:hover ${Header}{
      background-color: var(--primary-dark);
    }

    @media (min-width: 768px) {
      width: 100%;
      height: auto;
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
      padding-bottom: 10px;
      align-items: center;
    }
  }
`;

const MobileArea = styled.div`
   {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const MobileList = styled.div`
   {
    height: 120px;
    width: 90vw;
    z-index: 90;
    display: flex;
    gap: 10px;
    overflow-x: scroll;
    white-space: nowrap;
    padding: 10px 0;
    @media (min-width: 768px) {
      display: none;
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
    <MobileArea>
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
      <MobileList>
        {highlights.map((highlight) => (
          <HighlightThumbnail
            key={highlight.id}
            highlight={highlight}
            onClick={() => selectHighlight(highlight)}
          />
        ))}
      </MobileList>
    </MobileArea>
  );
};

export default ArticleHighlights;
