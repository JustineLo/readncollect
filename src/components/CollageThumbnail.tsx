import { MouseEventHandler } from "react";
import styled from "styled-components";

interface CollageThumbnailProps {
  title: string;
  excerpt: string;
  selectCollage: MouseEventHandler<HTMLButtonElement>;
}

const ThumbnailButton = styled.button`
   {
    overflow: hidden;
    background-color: var(--accent);
    color: var(--black);
    display: flex;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    height: 50px;
    padding: 0 20px;
  }

  p {
    text-align: left;
  }

  @media (min-width: 768px) {
    width: 100%;
    border-radius: 20px;
    background-color: var(--accent-light);
    flex-direction: column;
    height: 100%;
    padding: 0;
  }
`;

const Title = styled.div`
   {
    background-color: var(--accent);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h3 {
    margin: 0;
  }

  @media (min-width: 768px) {
    align-items: start;
    padding: 10px 30px;
  }
`;

const Content = styled.div`
   {
    padding: 10px 30px;
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
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
