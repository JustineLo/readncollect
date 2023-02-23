import styled from "styled-components";
import { useContainer } from "unstated-next";
import AppState from "../state/AppState";
import { Highlight } from "../types/Article";
import { getUpdatedArticles } from "../utils/articleUtils";

interface HighlightsBoardProps {
  articleDocID: string;
  highlightsBuffer: Highlight[];
  children: React.ReactNode;
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
  children,
}: HighlightsBoardProps): JSX.Element {
  const { user, articles, setArticles } = useContainer(AppState);
  return <HighlightsContainer>{children}</HighlightsContainer>;
}

export default HighlightsBoard;
