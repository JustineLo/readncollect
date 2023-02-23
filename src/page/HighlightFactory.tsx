import styled from "styled-components";
import { Article, Highlight } from "../types/Article";
import { useState } from "react";
import SelectableArticle from "../sections/SelectableArticle";
import HighlightsBoard from "../sections/HighlightsBoard";

interface HighlightFactoryProps {
  article: Article;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SelectionStateProps {
  selection: string | null;
  anchorNode: Node | null;
  focusNode: Node | null;
  anchorOffset: number | null;
  focusOffset: number | null;
  x: number | null;
  y: number | null;
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  color: black;
`;

const Board = styled.div`
  display: flex;
`;
const ArticleContainer = styled.div`
  width: 40%;
  padding: 5%;
  text-align: left;
  border-right: 1px solid black;
  h1 {
    font-size: 2rem;
  }
`;

const HighlightsContainer = styled.div`
  width: 60%;
`;

function HighlightFactory({
  article,
  setOpen,
}: HighlightFactoryProps): JSX.Element {
  const [articleHighlightsBuffer, setArticleHighlightsBuffer] = useState<
    Highlight[]
  >(article.highlights);

  function updateArticleHighlightsBuffer(newHighlight: Highlight): void {
    setArticleHighlightsBuffer([...articleHighlightsBuffer, newHighlight]);
  }

  return (
    <>
      <Container>
        <Board>
          <ArticleContainer>
            <SelectableArticle
              article={article}
              updateArticleHighlightsBuffer={updateArticleHighlightsBuffer}
            />
          </ArticleContainer>
          <HighlightsContainer>
            <button onClick={() => setOpen(false)}>Close</button>
            <HighlightsBoard
              articleDocID={article.articleDocID}
              highlightsBuffer={articleHighlightsBuffer}
            />
          </HighlightsContainer>
        </Board>
      </Container>
    </>
  );
}

export default HighlightFactory;
