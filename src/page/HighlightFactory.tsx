import AppState from "../state/AppState";
import { useContainer } from "unstated-next";
import styled from "styled-components";
import { Article } from "../types/Article";

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

const Board = styled.div``;
const ArticleContainer = styled.div`
  width: 40%;
  padding: 5%;
  text-align: left;
  border-right: 1px solid black;
  h1 {
    font-size: 2rem;
  }
`;

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
