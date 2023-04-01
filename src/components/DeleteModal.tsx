import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";

const ModalButtons = styled.div`
   {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
`;

const DeleteModal = ({
    onConfirmedDelete,
    setDeleteModalOpen
  }: {
    onConfirmedDelete: () => void;
    setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  }) => {
    return (
      <ConfirmationModal setOpen={setDeleteModalOpen}>
        <p>Are you sure you want to delete this article?</p>
        <span>Don't worry, this won't delete your highlights !</span>
        <ModalButtons>
          <Button onClick={onConfirmedDelete}>Delete</Button>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
        </ModalButtons>
      </ConfirmationModal>
    );
  };

  export default DeleteModal;