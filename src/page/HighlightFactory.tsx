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
  width: 100%;
  display: flex;
  gap: 25px;
  overflow-y: scroll;
  padding: 0 30px 20px 0;
  @media (min-width: 768px) {
    flex-direction: column;
    height: 80vh;
    margin: 60px 0;
  }
`;

const ThumbnailContainer = styled.div`
  width: 220px;
  height: 100%;
  @media (min-width: 768px) {
    width: 100%;
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
            <MobileClose>
              <Icon onClick={() => setOpen(false)}>
                <VscChromeClose size="24px" color="var(--black)" />
              </Icon>
            </MobileClose>
            <SelectableArticle
              article={article}
              updateArticleHighlightsBuffer={updateArticleHighlightsBuffer}
            />
          </ArticleContainer>
          <HighlightsContainer>
            <Topbar>
              <Icon onClick={() => setOpen(false)}>
                <VscChromeClose size="30px" />
              </Icon>
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
