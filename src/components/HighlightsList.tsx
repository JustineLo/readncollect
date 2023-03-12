import styled from "styled-components";
import { Highlight } from "../types/Article";
import HighlightThumbnail from "./HighlightThumbnail";

interface HighlightsListProps {
  title: string;
  highlights: Highlight[];
  handleClick: (highlight: Highlight) => void;
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

const HighlightsList = ({
  title,
  highlights,
  handleClick,
}: HighlightsListProps) => {
  return (
    <HighlightsListContainer>
      <h3>{title}</h3>
      <List>
        {highlights.map((highlight) => (
          <HighlightThumbnail
            key={highlight.id}
            highlight={highlight}
            onClick={() => handleClick(highlight)}
          />
        ))}
      </List>
    </HighlightsListContainer>
  );
};

export default HighlightsList;
