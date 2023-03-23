import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { Highlight } from "../types/Article";
import Icon from "./Icon";

interface HighlightProps {
  highlight: Highlight;
  onDeleteHighlight?: () => void;
  onClick?: () => void;
  fullWidth?: boolean;
  backgroundColor?: string;
}

interface ContainerProps {
  fullWidth?: boolean;
  backgroundColor?: string;
}

const Container = styled.div<ContainerProps>`
   {
    border-radius: 10px;
    width: 100px;
    background-color: ${(props) => props.backgroundColor || "var(--secondary)"};
    color: var(--black);
    border: 3px solid var(--secondary-dark);
    display: flex;

    cursor: pointer;
    gap: 20px;
    height: 100px;
    font-size: 0.8rem;
    overflow: hidden;
    text-ellipsis: ellipsis;
    padding: 2px;
    box-sizing: border-box;

    @media (min-width: 768px) {
      padding: 5px 30px;
      align-items: center;
      justify-content: space-between;
      font-size: 0.9rem;
      overflow: auto;
      height: auto;
      width: ${(props) => (props.fullWidth ? "auto" : "90%")};
    }
  }
`;

const HighlightThumbnail = ({
  highlight,
  onDeleteHighlight,
  onClick,
  fullWidth,
  backgroundColor,
}: HighlightProps) => {
  return (
    <Container
      onClick={onClick}
      fullWidth={fullWidth}
      backgroundColor={backgroundColor}
    >
      <p>{highlight.text}</p>
      {onDeleteHighlight && (
        <Icon onClick={onDeleteHighlight}>
          <FaRegTrashAlt color="var(--black)" />
        </Icon>
      )}
    </Container>
  );
};

export default HighlightThumbnail;
