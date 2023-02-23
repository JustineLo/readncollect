import styled from "styled-components";
import { useContainer } from "unstated-next";
import AppState from "../state/AppState";
import { Highlight } from "../types/Article";
import { getUpdatedArticles } from "../utils/articleUtils";

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
  const { user, articles, setArticles } = useContainer(AppState);
  return (
    <>
      <HighlightsContainer>
        <button
          onClick={() =>
            setArticles(
              getUpdatedArticles(user, articles, articleDocID, highlightsBuffer)
            )
          }
        >
          SAVE HIGHLIGHTS
        </button>
        {highlightsBuffer.map((highlight) => {
          return (
            <div key={highlight.id}>
              <p>{highlight.text}</p>
            </div>
          );
        })}
      </HighlightsContainer>
    </>
  );
}

export default HighlightsBoard;
