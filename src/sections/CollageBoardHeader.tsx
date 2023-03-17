import { uuidv4 } from "@firebase/util";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineBlock } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { GrTextAlignLeft } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import { TiExport } from "react-icons/ti";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import Button from "../components/Button";
import ConfirmationModal from "../components/ConfirmationModal";
import Icon from "../components/Icon";
import Input from "../components/Input";
import { db } from "../firebase";
import AppState from "../state/AppState";
import { Collage, Highlight } from "../types/Article";
interface CollageBoardHeaderProps {
  blocView: boolean;
  setBlocView: Dispatch<SetStateAction<boolean>>;
  handleSave: () => void;
  disableSave: boolean;
  currentCollage: Collage;
  setCurrentCollage: Dispatch<SetStateAction<Collage>>;
  setSelectedHighlights: Dispatch<SetStateAction<Highlight[]>>;
  showCollage: boolean;
  setShowCollage: Dispatch<SetStateAction<boolean>>;
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: var(--primary-dark);
  }

  div {
    display: flex;
    gap: 20px;
    align-items: center;
  }
`;

const ContentRow = styled.div<{ showCollage: boolean }>`
  display: ${(props) => (props.showCollage ? "flex" : "none")};
  justify-content: space-between;
  margin: 2rem 0 1rem 0;
`;

const CollageBoardHeader = ({
  blocView,
  setBlocView,
  handleSave,
  disableSave,
  currentCollage,
  setCurrentCollage,
  setSelectedHighlights,
  showCollage,
  setShowCollage,
}: CollageBoardHeaderProps) => {
  const [displayNewCollageModal, setDisplayNewCollageModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const { user, setUser } = useContainer(AppState);

  function createCollage(): void {
    const newCollage: Collage = {
      id: uuidv4(),
      title: currentTitle,
      highlights: [],
      excerpt: "",
      createdAt: new Date().toISOString().substring(0, 10),
    };
    setCurrentCollage(newCollage);
    setSelectedHighlights([]);
    setDisplayNewCollageModal(false);
    setShowCollage(true);
  }

  function onDeleteCollage(): void {
    const updatedCollages: Collage[] = user.collages.filter(
      (collage) => collage.id !== currentCollage.id
    );
    const userRef = doc(db, `users/${user.docID}`);
    updateDoc(userRef, {
      collages: updatedCollages,
    }).catch((error) => {
      console.error(error);
    });
    setUser({
      ...user,
      collages: updatedCollages,
    });
    setCurrentCollage({
      id: "",
      title: "",
      highlights: [],
      excerpt: "",
      createdAt: "",
    });
    setSelectedHighlights([]);
    setDisplayDeleteModal(false);
    setShowCollage(false);
  }

  return (
    <>
      <Header>
        <TitleRow>
          <h1>Collage Factory</h1>
          <div>
            <Icon
              color="var(--primary-dark)"
              hoverColor="var(--primary-text)"
              onClick={() => setDisplayNewCollageModal(true)}
            >
              <IoMdAddCircle size="30px" />
            </Icon>
            <Button
              onClick={() => setBlocView(!blocView)}
              square={true}
              backgroundColor="transparent"
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                {blocView ? "Switch to text" : "Switch to blocs"}
                {blocView ? (
                  <GrTextAlignLeft />
                ) : (
                  <AiOutlineBlock size="16px" />
                )}
              </div>
            </Button>
          </div>
        </TitleRow>
        <ContentRow showCollage={showCollage}>
          <h3>{currentCollage.title}</h3>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Icon
              onClick={handleSave}
              opacity={disableSave ? 0.5 : 1}
              backgroundColor="var(--secondary)"
              hoverColor="var(--secondary-light)"
              color="var(--primary-text)"
              disabled={disableSave}
            >
              <FiSave size="20px" />
            </Icon>
            <Icon
              color="var(--black)"
              hoverColor="var(--secondary-dark)"
              onClick={() => {}}
            >
              <TiExport size="20px" />
            </Icon>
            <Icon
              color="var(--black)"
              hoverColor="var(--secondary-dark)"
              onClick={() => setDisplayDeleteModal(true)}
            >
              <FaRegTrashAlt size="15px" />
            </Icon>
          </div>
        </ContentRow>
      </Header>
      {displayNewCollageModal && (
        <ConfirmationModal setOpen={setDisplayNewCollageModal}>
          <p>Collage title :</p>
          <Input
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
          />
          <Button
            onClick={createCollage}
            backgroundColor="var(--primary)"
            textColor="var(--primary-text)"
          >
            {" "}
            Create new collage{" "}
          </Button>
        </ConfirmationModal>
      )}
      {displayDeleteModal && (
        <ConfirmationModal setOpen={setDisplayDeleteModal}>
          <p>Are you sure you want to delete this collage ?</p>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Button onClick={onDeleteCollage}> Delete </Button>
            <Button
              onClick={() => setDisplayDeleteModal(false)}
              border="var(--primary-dark)"
              backgroundColor="transparent"
            >
              {" "}
              Cancel{" "}
            </Button>
          </div>
        </ConfirmationModal>
      )}
    </>
  );
};

export default CollageBoardHeader;
