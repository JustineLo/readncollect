import styled from "styled-components";
import { Article, Highlight } from "../types/Article";
import { FaRegTrashAlt } from "react-icons/fa";
import Icon from "./Icon";
import HighlightFactory from "../page/HighlightFactory";
import { useState } from "react";

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
  }
`;
const Text = styled.div`
   {
  }
`;

const Buttons = styled.div`
   {
    cursor: pointer;
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
