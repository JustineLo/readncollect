import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import Button from "../components/Button";
import HighlightThumbnail from "../components/HighlightThumbnail";
import SelectableArticle from "../sections/SelectableArticle";
import AppState from "../state/AppState";
import { Article, Highlight } from "../types/Article";
import { getUpdatedArticles } from "../utils/articleUtils";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--primary);
  width: 100%;
  z-index: 100;
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;

  @media (min-width: 768px) {
    margin: 20px;
    border-radius: 30px;
    border: 3px solid var(--black);
    width: calc(100% - 40px);
    height: calc(100% - 40px);
  }
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const ArticleContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  height: 80%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    width: 60%;
    height: 100%;
    padding: 30px;
  }
`;

const MobileClose = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const HighlightsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
  color: var(--black);
  overflow-x: scroll;
  padding: 10px;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (min-width: 768px) {
    width: 40%;
    color: var(--white);
    height: 100%;
    padding: 2% 5%;
    align-items: flex-end;
  }
`;

const Topbar = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
  }
`;

const HighlightsList = styled.div`
  width: 90%;
  display: flex;
  gap: 25px;
  overflow-x: scroll;
  padding: 0 30px 20px 0;
  @media (min-width: 768px) {
    flex-direction: column;
    height: 80vh;
    margin: 60px 0;
    width: 100%;
  }
`;

const ThumbnailContainer = styled.div`
  width: 220px;
  height: 100%;
  @media (min-width: 768px) {
    width: 100%;
  }
`;

function HighlightFactory(): JSX.Element {

  const { id } = useParams();
  const { user, articles, setArticles } = useContainer(AppState);
  const foundId = articles.findIndex((article) => article.articleDocID === id);
  const navigate = useNavigate();
  if (foundId === -1) {
    return <div>Article not found</div>;
  }
  const article: Article = articles.filter((article) => article.articleDocID === id)[0];

  const [articleHighlightsBuffer, setArticleHighlightsBuffer] = useState<
    Highlight[]
  >(article.highlights);

  function updateArticleHighlightsBuffer(newHighlight: Highlight): void {
    setArticleHighlightsBuffer([...articleHighlightsBuffer, newHighlight]);
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

  function onSaveHighlights() {
    setArticles(
      getUpdatedArticles(user, articles, article.articleDocID, articleHighlightsBuffer)
    );
    navigate('/articles');
  }

  return (
    <>
      <Container>
        <Board>
          <ArticleContainer>
            <MobileClose>
                <Button onClick={onSaveHighlights} textColor="var(--accent-dark)" backgroundColor="var(--accent-light)" square={true}>SAVE AND CLOSE</Button>
            </MobileClose>
            <SelectableArticle
              article={article}
              updateArticleHighlightsBuffer={updateArticleHighlightsBuffer}
            />
          </ArticleContainer>
          <HighlightsContainer>
            <Topbar>
              <Button onClick={onSaveHighlights} textColor="var(--accent-dark)" backgroundColor="var(--accent-light)" square={true}>SAVE AND CLOSE</Button>
            </Topbar>
            <HighlightsList>
              {articleHighlightsBuffer.map((highlight) => {
                return (
                  <ThumbnailContainer key={highlight.id}>
                    <HighlightThumbnail
                      highlight={highlight}
                      onDeleteHighlight={() => onDeleteHighlight(highlight)}
                      fullWidth={true}
                    />
                  </ThumbnailContainer>
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
