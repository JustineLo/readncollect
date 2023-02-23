import styled from "styled-components";
import { Article, Highlight } from "../types/Article";
import { useState } from "react";
import FloatingSaveButton from "../components/FloatingSaveButton";

interface SelectableArticleProps {
  article: Article;
  updateArticleHighlightsBuffer: (newHighlight: Highlight) => void;
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

const ArticleContainer = styled.div`
  text-align: left;
  background-color: white;
  color: black;
  h1 {
    font-size: 2rem;
  }
`;

const HighlightsContainer = styled.div``;

function SelectableArticle({
  article,
  updateArticleHighlightsBuffer,
}: SelectableArticleProps): JSX.Element {
  const [displayAddButton, setDisplayAddButton] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [selectionState, setSelectionState] = useState<SelectionStateProps>({
    selection: null,
    anchorNode: null,
    focusNode: null,
    anchorOffset: null,
    focusOffset: null,
    x: null,
    y: null,
  });

  const onMouseUpHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const selectionObj = window.getSelection && window.getSelection();
    if (selectionObj?.toString() !== "") {
      const selection = selectionObj!.toString();
      const anchorNode = selectionObj!.anchorNode!;
      const focusNode = selectionObj!.focusNode!;
      const anchorOffset = selectionObj!.anchorOffset;
      const focusOffset = selectionObj!.focusOffset;
      const x = e.clientX;
      const y = e.clientY;

      setSelectionState({
        selection,
        anchorNode,
        focusNode,
        anchorOffset,
        focusOffset,
        x,
        y,
      });

      setMousePos({ x: x, y: y });
      setDisplayAddButton(true);
    } else {
      setDisplayAddButton(false);
    }
  };

  function handleSaveHighlight(): void {
    const newHighlight: Highlight = {
      text: selectionState.selection!,
      tags: [],
    };
    updateArticleHighlightsBuffer(newHighlight);
    setDisplayAddButton(false);
  }

  return (
    <>
      <ArticleContainer>
        <h1>{article.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: article.zContent }}
          onMouseUp={onMouseUpHandler}
        />
        {displayAddButton && (
          <FloatingSaveButton
            mousePos={{ x: mousePos.x, y: mousePos.y }}
            handleSave={handleSaveHighlight}
          />
        )}
      </ArticleContainer>
    </>
  );
}

export default SelectableArticle;
