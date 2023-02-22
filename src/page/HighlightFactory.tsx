import AppState from "../state/AppState";
import { useContainer } from "unstated-next";
import styled from "styled-components";
import { Article } from "../types/Article";

interface HighlightFactoryProps {
  article: Article;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
`;

const Board = styled.div``;
const ArticleContainer = styled.div``;

const HighlightsContainer = styled.div``;

function HighlightFactory({ article }: HighlightFactoryProps): JSX.Element {
  return (
    <>
      <Container>
        <Board>
          <ArticleContainer>
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: article.zContent }} />
          </ArticleContainer>
          <HighlightsContainer></HighlightsContainer>
        </Board>
      </Container>
    </>
  );
}

export default HighlightFactory;
