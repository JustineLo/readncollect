import styled from "styled-components";

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
    top: ${(props) => props.mousePos.y - 10}px;
    left: ${(props) => props.mousePos.x - 25}px;
    width: 80px;
    height: 40px;

    button {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background: var(--pink);
      color: white;
      font-size: 1rem;
      border: none;
    }
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
