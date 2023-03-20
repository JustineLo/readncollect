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
    border-radius: 20px;
    overflow: hidden;
    background-color: var(--accent-light);
    color: var(--black);
    display: flex;
    flex-direction: column;
    align-items: start;
    cursor: pointer;
    border: none;
    padding: 0;
  }

  p {
    text-align: left;
  }
`;

const Title = styled.div`
   {
    background-color: var(--accent);
    width: 100%;
  }
`;

const Content = styled.div`
   {
    padding: 10px 30px;
  }
`;

const CollageThumbnail = ({
  title,
  excerpt,
  selectCollage,
}: CollageThumbnailProps) => {
  return (
    <ThumbnailButton onClick={selectCollage}>
      <Title>
        <h3>{title}</h3>
      </Title>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
      </Content>
    </ThumbnailButton>
  );
};

export default CollageThumbnail;
