import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import HighlightThumbnail from "../components/HighlightThumbnail";
import Icon from "../components/Icon";
import SelectableArticle from "../sections/SelectableArticle";
import AppState from "../state/AppState";
import { Article, Highlight } from "../types/Article";
import { getUpdatedArticles } from "../utils/articleUtils";

interface HighlightFactoryProps {
  article: Article;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.div`
  margin: 20px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--primary);
  border: 3px solid var(--black);
  border-radius: 30px;
  width: 100%;
  z-index: 100;
  box-sizing: border-box;
`;

const Board = styled.div`
  display: flex;
`;
const ArticleContainer = styled.div`
  width: 60%;
  padding: 30px;
`;

const HighlightsContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const HighlightsList = styled.div`
  width: 100%;
  margin: 60px 0;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 25px;
  overflow-y: scroll;
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
            <Topbar>
              <Icon onClick={() => setOpen(false)}>
                <VscChromeClose size="2rem" />
              </Icon>
            </Topbar>
            <HighlightsList>
              {articleHighlightsBuffer.map((highlight) => {
                return (
                  <HighlightThumbnail
                    key={highlight.id}
                    highlight={highlight}
                    onDeleteHighlight={() => onDeleteHighlight(highlight)}
                  />
                );
              })}
            </HighlightsList>
          </HighlightsContainer>
        </Board>
      </Container>
    </>
  );
}

export default HighlightFactory;
