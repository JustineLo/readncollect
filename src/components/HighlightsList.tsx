import styled from "styled-components";
import { Highlight } from "../types/Article";
import HighlightThumbnail from "./HighlightThumbnail";

interface HighlightsListProps {
  title: string;
  highlights: Highlight[];
}

const HighlightsListContainer = styled.div`
   {
  }
`;

const List = styled.div`
   {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const HighlightsList = ({ title, highlights }: HighlightsListProps) => {
  return (
    <HighlightsListContainer>
      <h3>{title}</h3>
      <List>
        {highlights.map((highlight, index) => (
          <HighlightThumbnail
            key={highlight.id}
            highlight={highlight}
            index={index}
          />
        ))}
      </List>
    </HighlightsListContainer>
  );
};

export default HighlightsList;
