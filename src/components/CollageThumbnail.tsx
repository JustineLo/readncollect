import { MouseEventHandler } from "react";
import styled from "styled-components";

interface CollageThumbnailProps {
  title: string;
  excerpt: string;
  selectCollage: MouseEventHandler<HTMLButtonElement>;
}

const ThumbnailButton = styled.button`
   {
    width: auto;
    border-radius: 10px;
    padding: 5px 30px;
    background-color: var(--purple-medium-transparent);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    gap: 20px;
    border: none;
  }
`;

const CollageThumbnail = ({
  title,
  excerpt,
  selectCollage,
}: CollageThumbnailProps) => {
  return (
    <ThumbnailButton onClick={selectCollage}>
      <h3>{title}</h3>
      <p>{excerpt.substring(0, 500) + "..."}</p>
    </ThumbnailButton>
  );
};

export default CollageThumbnail;
