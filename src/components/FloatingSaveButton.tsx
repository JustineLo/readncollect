import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Highlight } from "../types/Article";

interface FloatingSaveButtonProps {
  mousePos: { x: number; y: number };
  handleSave: () => void;
}

const FloatingSaveButtonContainer = styled.div<{
  mousePos: { x: number; y: number };
}>`
   {
    display: block;
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
  handleSave,
}: FloatingSaveButtonProps) => {
  return (
    <FloatingSaveButtonContainer mousePos={mousePos}>
      <button onClick={handleSave}>SAVE</button>
    </FloatingSaveButtonContainer>
  );
};

export default FloatingSaveButton;
