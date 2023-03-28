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
    top: ${(props) => props.mousePos.y - 35}px;
    left: ${(props) => props.mousePos.x - 65}px;
    width: 120px;
    height: 40px;
    font-size: 0.8rem;

    button {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background: var(--accent);
      color: var(--black);
      border: 2px solid var(--black);
    }
  }
`;

const FloatingSaveButton = ({
  mousePos,
  handleSave,
}: FloatingSaveButtonProps) => {
  return (
    <FloatingSaveButtonContainer mousePos={mousePos}>
      <button onClick={handleSave}>ADD HIGHLIGHT</button>
    </FloatingSaveButtonContainer>
  );
};

export default FloatingSaveButton;
