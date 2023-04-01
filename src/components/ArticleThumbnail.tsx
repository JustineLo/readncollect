import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Article } from "../types/Article";
import { textEllipsis } from "../utils/articleUtils";
import Icon from "./Icon";

interface ArticleThumbnailProps {
  article: Article;
  onClickArticle: () => void;
}

const Image = styled.img`
   {
    width: 25%;
    height: 100px;
    object-fit: cover;
    cursor: pointer;
    filter: brightness(0.5);
    transition: filter 0.3s ease-in-out;
  }
`;

const Container = styled.div`
   {
    width: 300px;
    height: 100px;
    border-radius: 10px;
    background-color: var(--secondary);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      background-color: var(--secondary-light);
      transition: 0.3s;
    }

    &:hover ${Image} {
      filter: brightness(1);
      transition: 0.3s;
    }

    &:not(:hover) ${Image} {
      filter: brightness(0.5);
      transition: 0.3s;
    }
  }
`;
const Title = styled.p`
   {
    cursor: pointer;
    padding-left: 20px;
    width: 60%;
  }
`;

const Buttons = styled.div`
   {
    cursor: pointer;
    box-sizing: border-box;
    padding-right: 10px;
    width: 15%;
    display: flex;
    justify-content: center;
  }
`;

const ArticleThumbnail = ({
  article,
  onClickArticle,
}: ArticleThumbnailProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Image
          src={article.image}
          onClick={() => navigate('/highlightfactory/' + article.articleDocID)}
        />
        <Title onClick={() => navigate('/highlightfactory/' + article.articleDocID)}>
          {textEllipsis(article.title, 57)}
        </Title>
        <Buttons>
          <Icon onClick={onClickArticle} color="var(--grey)" hoverColor="var(--white)">
            <FaRegTrashAlt />
          </Icon>
        </Buttons>
      </Container>
    </>
  );
};

export default ArticleThumbnail;
