import styled from "styled-components";
import { Article, Highlight } from "../types/Article";
import { useState } from "react";
import SelectableArticle from "../sections/SelectableArticle";
import { useContainer } from "unstated-next";
import HighlightThumbnail from "../components/HighlightThumbnail";
import AppState from "../state/AppState";
import { getUpdatedArticles } from "../utils/articleUtils";

interface HighlightFactoryProps {
  article: Article;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  text-align: left;
  background-color: white;
  color: black;
  h1 {
    font-size: 2rem;
  }
`;

function HighlightFactory({
  article,
  setOpen,
}: HighlightFactoryProps): JSX.Element {
  const [articleHighlightsBuffer, setArticleHighlightsBuffer] = useState<
    Highlight[]
  >(article.highlights);

  const { user, articles, setArticles } = useContainer(AppState);

  function updateArticleHighlightsBuffer(newHighlight: Highlight): void {
    const newArray = [...articleHighlightsBuffer, newHighlight];
    setArticleHighlightsBuffer(newArray);
    setArticles(
      getUpdatedArticles(user, articles, article.articleDocID, newArray)
    );
  }

  function onDeleteHighlight(highlight: Highlight) {
    const updatedHighlights = articles
      .find(
        (checkedArticle) => checkedArticle.articleDocID === article.articleDocID
      )!
      .highlights.filter((h) => h.id !== highlight.id);

    setArticleHighlightsBuffer(updatedHighlights);

    setArticles(
      getUpdatedArticles(
        user,
        articles,
        article.articleDocID,
        updatedHighlights
      )
    );
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
            {articleHighlightsBuffer.map((highlight) => {
              return (
                <HighlightThumbnail
                  key={highlight.id}
                  highlight={highlight}
                  onDeleteHighlight={() => onDeleteHighlight(highlight)}
                />
              );
            })}
          </HighlightsContainer>
        </Board>
      </Container>
    </>
  );
}

export default HighlightFactory;
