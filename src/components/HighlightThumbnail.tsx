import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { Highlight } from "../types/Article";
import Icon from "./Icon";

interface HighlightProps {
  highlight: Highlight;
  onDeleteHighlight?: () => void;
  onClick?: () => void;
  fullWidth?: boolean;
  heightAuto?: boolean;
  backgroundColor?: string;
}

interface ContainerProps {
  fullWidth?: boolean;
  heightAuto?: boolean;
  backgroundColor?: string;
}

const Container = styled.div<ContainerProps>`
   {
    border-radius: 10px;
    width: ${(props) => (props.fullWidth ? "auto" : "100px")};
    height: ${(props) => (props.heightAuto ? "auto" : "100px")};
    background-color: ${(props) => props.backgroundColor || "var(--secondary)"};
    color: var(--black);
    border: 3px solid var(--secondary-dark);
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.8rem;
    overflow: hidden;
    text-ellipsis: ellipsis;
    padding: ${(props) => (props.heightAuto ? " 0 0 0 10px" : "2px")};
    box-sizing: border-box;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: var(--secondary-light);
    }

    p {
      overflow: hidden;
      height: 100%;
    }

    @media (min-width: 768px) {
      padding: 5px 30px;
      align-items: center;
      justify-content: space-between;
      font-size: 0.9rem;
      overflow: auto;
      height: auto;
      gap: 20px;
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
  heightAuto,
}: HighlightProps) => {
  return (
    <Container
      onClick={onClick}
      fullWidth={fullWidth}
      heightAuto={heightAuto}
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
