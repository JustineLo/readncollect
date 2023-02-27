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

const Container = styled.div`
   {
    width: 300px;
    max-height: 150px;
    border-radius: 10px;
    padding: 5px 30px;
    background: var(--purple-medium-transparent);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
      background: var(--purple-medium);
      transition: 0.3s;
    }
  }
`;
const Text = styled.div`
   {
  }
`;

const Buttons = styled.div`
   {
    cursor: pointer;
    box-sizing: border-box;
    padding: 5px;
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
      <Container onClick={() => setOpenHighlightFactory(true)}>
        <Text>
          <p>{article.title}</p>
        </Text>
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
