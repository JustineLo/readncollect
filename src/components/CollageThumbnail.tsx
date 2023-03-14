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
    align-items: start;
    cursor: pointer;
    gap: 20px;
    border: none;
  }

  p {
    text-align: left;
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
      <div dangerouslySetInnerHTML={{ __html: excerpt }} />
    </ThumbnailButton>
  );
};

export default CollageThumbnail;
