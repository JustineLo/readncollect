import styled from "styled-components";
import { Highlight } from "../types/Article";
import { useContainer } from "unstated-next";
import AppState from "../state/AppState";

interface HighlightsBoardProps {
  articleDocID: string;
  highlightsBuffer: Highlight[];
}

const HighlightsContainer = styled.div`
  text-align: left;
  background-color: white;
  color: black;
  h1 {
    font-size: 2rem;
  }
`;

function HighlightsBoard({
  articleDocID,
  highlightsBuffer,
}: HighlightsBoardProps): JSX.Element {
  const { updateArticleHighlights } = useContainer(AppState);
  return (
    <>
      <HighlightsContainer>
        <button
          onClick={() =>
            updateArticleHighlights(articleDocID, highlightsBuffer)
          }
        >
          SAVE HIGHLIGHTS
        </button>
        {highlightsBuffer.map((highlight) => {
          return (
            <div>
              <p>{highlight.text}</p>
            </div>
          );
        })}
      </HighlightsContainer>
    </>
  );
}

export default HighlightsBoard;
