import { uuidv4 } from "@firebase/util";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import Button from "../components/Button";
import HighlightThumbnail from "../components/HighlightThumbnail";
import Input from "../components/Input";
import { db } from "../firebase";
import AppState from "../state/AppState";
import { Collage, Highlight } from "../types/Article";
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

  function createCollage(): void {
    const newCollage: Collage = {
      id: uuidv4(),
      title: currentTitle,
      highlights: [],
      createdAt: new Date().toISOString().substring(0, 10),
    };
    setCurrentCollage(newCollage);
    setSelectedHighlights([]);
    setDisplayNewCollageModal(false);
  }

  function handleSave(): void {
    const collageIndex = user.collages.findIndex(
      (c) => c.id === currentCollage.id
    );
    const updatedCollages: Collage[] =
      collageIndex === -1
        ? [...user.collages, currentCollage]
        : user.collages.map((c, index) =>
            index === collageIndex ? currentCollage : c
          );
    const userRef = doc(db, `users/${user.docID}`);
    setUser({
      ...user,
      collages: updatedCollages,
    });

    updateDoc(userRef, {
      collages: updatedCollages,
    })
      .then(() => {
        console.log("collages updated successfully");
      })
      .catch((error) => {
        console.error("Error updating soloHighlights:", error);
      });
  }

  return (
    <>
      <Droppable droppableId="highlights">
        {(provided) => {
          return (
            <Board {...provided.droppableProps} ref={provided.innerRef}>
              <Button onClick={handleSave}>SAVE COLLAGE</Button>
              <Button onClick={() => setBlocView(!blocView)}>
                Switch view
              </Button>
              <Button onClick={() => setDisplayNewCollageModal(true)}>
                New collage
              </Button>
              <h2>{currentCollage.title}</h2>
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
                  <p>{highlight.text}</p>
                )
              )}
              {provided.placeholder}
            </Board>
          );
        }}
      </Droppable>
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
