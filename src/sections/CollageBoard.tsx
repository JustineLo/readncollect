import { uuidv4 } from "@firebase/util";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiOutlineBlock } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { GrTextAlignLeft } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import { TiExport } from "react-icons/ti";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import Button from "../components/Button";
import HighlightThumbnail from "../components/HighlightThumbnail";
import Icon from "../components/Icon";
import Input from "../components/Input";
import { db } from "../firebase";
import AppState from "../state/AppState";
import { Collage, Highlight } from "../types/Article";
import { StrictModeDroppable } from "../utils/StrictModeDroppable";
import ConfirmationModal from "./../components/ConfirmationModal";
interface CollageBoardProps {
  currentCollage: Collage;
  setCurrentCollage: Dispatch<SetStateAction<Collage>>;
  selectedHighlights: Highlight[];
  setSelectedHighlights: Dispatch<SetStateAction<Highlight[]>>;
}

const Board = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 2% 5%;
  box-sizing: border-box;
`;

const TopButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div<{
  backgroundColor: string;
  padding: string;
  borderRadius: string;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  gap: 1rem;
`;

const CollageBoard = ({
  currentCollage,
  setCurrentCollage,
  selectedHighlights,
  setSelectedHighlights,
}: CollageBoardProps) => {
  const { user, setUser } = useContainer(AppState);
  const [blocView, setBlocView] = useState(true);
  const [displayNewCollageModal, setDisplayNewCollageModal] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [disableSave, setDisableSave] = useState(true);

  useEffect(() => {
    setDisableSave(selectedHighlights === currentCollage.highlights);
  }, [selectedHighlights]);

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
  }

  function handleSave(): void {
    let excerpt = "";
    for (let i = 0; i < selectedHighlights.length; i++) {
      const highlight = selectedHighlights[i];
      excerpt += "<p>" + highlight.text.substring(0, 200) + "...</p>";
      if (i === 1) {
        break;
      }
    }
    const collage = {
      ...currentCollage,
      highlights: selectedHighlights,
      excerpt: excerpt,
    };
    const collageIndex = user.collages.findIndex((c) => c.id === collage.id);
    const updatedCollages: Collage[] =
      collageIndex === -1
        ? [...user.collages, collage]
        : user.collages.map((c, index) =>
            index === collageIndex ? collage : c
          );
    const userRef = doc(db, `users/${user.docID}`);
    setUser({
      ...user,
      collages: updatedCollages,
    });
    setDisableSave(true);

    updateDoc(userRef, {
      collages: updatedCollages,
    }).catch((error) => {
      console.error("Error updating soloHighlights:", error);
    });
  }

  return (
    <>
      <StrictModeDroppable droppableId="highlights">
        {(provided) => {
          return (
            <Board {...provided.droppableProps} ref={provided.innerRef}>
              <TopButtons>
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
                <Icon
                  color="var(--primary-dark)"
                  hoverColor="var(--primary-text)"
                  onClick={() => setDisplayNewCollageModal(true)}
                >
                  <IoMdAddCircle size="30px" />
                </Icon>
              </TopButtons>

              <Header>
                <h3>{currentCollage.title}</h3>
                <div style={{ display: "flex", gap: "10px" }}>
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
                </div>
              </Header>
              <Content
                backgroundColor={blocView ? "transparent" : "var(--white)"}
                padding={blocView ? "0" : "5% 8%"}
                borderRadius={blocView ? "0" : "20px"}
              >
                {selectedHighlights.map((highlight, index) =>
                  blocView ? (
                    <Draggable
                      key={highlight.id}
                      draggableId={highlight.id}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <HighlightThumbnail
                              highlight={highlight}
                              fullWidth={true}
                              backgroundColor="var(--secondary-light)"
                              onDeleteHighlight={() =>
                                setSelectedHighlights(
                                  selectedHighlights.filter(
                                    (h) => h.id !== highlight.id
                                  )
                                )
                              }
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  ) : (
                    <p key={highlight.id}>{highlight.text}</p>
                  )
                )}
                {provided.placeholder}
              </Content>
            </Board>
          );
        }}
      </StrictModeDroppable>
      {displayNewCollageModal && (
        <ConfirmationModal setOpen={setDisplayNewCollageModal}>
          <p>Title :</p>
          <Input
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
          />
          <Button onClick={createCollage}> Create new collage </Button>
        </ConfirmationModal>
      )}
    </>
  );
};

export default CollageBoard;
