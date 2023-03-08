import { doc, updateDoc } from "@firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import { db } from "../firebase";
import HighlightFactory from "../page/HighlightFactory";
import AppState from "../state/AppState";
import { Article } from "../types/Article";
import { textEllipsis } from "../utils/articleUtils";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";
import Icon from "./Icon";

interface ArticleThumbnailProps {
  article: Article;
  onDeleteArticle: () => void;
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

const ModalButtons = styled.div`
   {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
`;

const ArticleThumbnail = ({
  article,
  onDeleteArticle,
}: ArticleThumbnailProps) => {
  const [openHighlightFactory, setOpenHighlightFactory] =
    useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { user, setUser } = useContainer(AppState);

  const onClickDelete = () => {
    setOpenDeleteModal(false);
    if (article.highlights.length > 0) {
      const userRef = doc(db, `users/${user.docID}`);
      setUser({
        ...user,
        soloHighlights: [...user.soloHighlights, ...article.highlights],
      });
      updateDoc(userRef, {
        soloHighlights: [...user.soloHighlights, ...article.highlights],
      })
        .then(() => {
          console.log("soloHighlights updated successfully");
        })
        .catch((error) => {
          console.error("Error updating soloHighlights:", error);
        });
    }
    onDeleteArticle();
  };

  return (
    <>
      <Container>
        <Image
          src={article.image}
          onClick={() => setOpenHighlightFactory(true)}
        />
        <Title onClick={() => setOpenHighlightFactory(true)}>
          {textEllipsis(article.title, 57)}
        </Title>
        <Buttons>
          <Icon onClick={() => setOpenDeleteModal(true)}>
            <FaRegTrashAlt />
          </Icon>
        </Buttons>
      </Container>
      {openHighlightFactory && (
        <HighlightFactory setOpen={setOpenHighlightFactory} article={article} />
      )}
      {openDeleteModal && (
        <DeleteModal
          setOpenDeleteModal={setOpenDeleteModal}
          onClickDelete={onClickDelete}
        />
      )}
    </>
  );
};

const DeleteModal = ({
  setOpenDeleteModal,
  onClickDelete,
}: {
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  onClickDelete: () => void;
}) => {
  return (
    <ConfirmationModal setOpen={setOpenDeleteModal}>
      <p>Are you sure you want to delete this article?</p>
      <span>Don't worry, this won't delete your highlights !</span>
      <ModalButtons>
        <Button onClick={onClickDelete}>Delete</Button>
        <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
      </ModalButtons>
    </ConfirmationModal>
  );
};

export default ArticleThumbnail;
