import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Highlight } from "../types/Article";

interface FloatingSaveButtonProps {
  mousePos: { x: number; y: number };
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  display: boolean;
  articleHighlights: Highlight[];
  setArticleHighlights: React.Dispatch<React.SetStateAction<Highlight[]>>;
  selection: string;
}

const FloatingSaveButtonContainer = styled.div<{
  mousePos: { x: number; y: number };
  displayButton: boolean;
}>`
   {
    display: ${(props) => (props.displayButton ? "block" : "none")};
    position: absolute;
    top: ${(props) => props.mousePos.y}px;
    left: ${(props) => props.mousePos.x}px;
    width: 100px;
    height: 60px;
    background-color: red;
  }
`;

const FloatingSaveButton = ({
  mousePos,
  display,
  setDisplay,
  articleHighlights,
  setArticleHighlights,
  selection,
}: FloatingSaveButtonProps) => {
  const handleSaveBloc = () => {
    const newHighlight: Highlight = { text: selection, tags: [] };
    setArticleHighlights([...articleHighlights, newHighlight]);
    setDisplay(false);
  };

  return (
    <FloatingSaveButtonContainer mousePos={mousePos} displayButton={display}>
      <button onClick={handleSaveBloc}>SAVE</button>
    </FloatingSaveButtonContainer>
  );
};

export default FloatingSaveButton;
