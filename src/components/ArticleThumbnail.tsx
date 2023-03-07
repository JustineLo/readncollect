import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import HighlightFactory from "../page/HighlightFactory";
import { Article } from "../types/Article";
import Icon from "./Icon";

interface ArticleThumbnailProps {
  article: Article;
  onDeleteArticle: () => void;
}

const Image = styled.img`
   {
    width: 100px;
    height: 100px;
    object-fit: cover;
    cursor: pointer;
  }
`;

const Container = styled.div`
   {
    width: 300px;
    max-height: 150px;
    border-radius: 10px;
    background: var(--purple-medium-transparent);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      background-color: var(--purple-medium);
      transition: 0.3s;
    }

    &:hover ${Image} {
      transform: scale(1.1);
      transition: 0.3s;
    }

    &:not(:hover) ${Image} {
      transform: none;
      transition: 0.3s;
    }
  }
`;
const Title = styled.p`
   {
    cursor: pointer;
    padding-left: 20px;
  }
`;

const Buttons = styled.div`
   {
    cursor: pointer;
    box-sizing: border-box;
    padding-right: 20px;
  }
`;

const ArticleThumbnail = ({
  article,
  onDeleteArticle,
}: ArticleThumbnailProps) => {
  const [openHighlightFactory, setOpenHighlightFactory] =
    useState<boolean>(false);
  return (
    <>
      <Container>
        <Image
          src={article.image}
          onClick={() => setOpenHighlightFactory(true)}
        />
        <Title onClick={() => setOpenHighlightFactory(true)}>
          {article.title}
        </Title>
        <Buttons>
          <Icon onClick={onDeleteArticle}>
            <FaRegTrashAlt />
          </Icon>
        </Buttons>
      </Container>
      {openHighlightFactory && (
        <HighlightFactory setOpen={setOpenHighlightFactory} article={article} />
      )}
    </>
  );
};

export default ArticleThumbnail;
