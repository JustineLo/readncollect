import AppState from "../state/AppState";
import { useContainer } from "unstated-next";
import styled from "styled-components";
import { Article, Highlight } from "../types/Article";
import { useState } from "react";
import FloatingSaveButton from "../components/FloatingSaveButton";
import SelectableArticle from "../sections/selectableArticle";

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

function HighlightFactory({
  article,
  setOpen,
}: HighlightFactoryProps): JSX.Element {
  return (
    <>
      <Container>
        <Board>
          <ArticleContainer>
            <SelectableArticle article={article} />
          </ArticleContainer>
          <HighlightsContainer></HighlightsContainer>
        </Board>
      </Container>
    </>
  );
}

export default HighlightFactory;
