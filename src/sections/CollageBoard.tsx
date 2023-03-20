import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import HighlightThumbnail from "../components/HighlightThumbnail";
import { db } from "../firebase";
import AppState from "../state/AppState";
import { Collage, Highlight } from "../types/Article";
import { StrictModeDroppable } from "../utils/StrictModeDroppable";
import CollageBoardHeader from "./CollageBoardHeader";
import NoCollageMessage from "./NoCollageMessage";
interface CollageBoardProps {
  currentCollage: Collage;
  setCurrentCollage: Dispatch<SetStateAction<Collage>>;
  selectedHighlights: Highlight[];
  setSelectedHighlights: Dispatch<SetStateAction<Highlight[]>>;
  showCollage: boolean;
  setShowCollage: Dispatch<SetStateAction<boolean>>;
  setDisplayAllCollages: Dispatch<SetStateAction<boolean>>;
}

const DroppableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 2% 5%;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: scroll;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    color: var(--primary-dark);
  }
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
  showCollage,
  setShowCollage,
  setDisplayAllCollages,
}: CollageBoardProps) => {
  const { user, setUser } = useContainer(AppState);
  const [blocView, setBlocView] = useState(true);

  const [disableSave, setDisableSave] = useState(true);

  useEffect(() => {
    setDisableSave(selectedHighlights === currentCollage.highlights);
  }, [selectedHighlights]);

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
      <DroppableContainer>
        <CollageBoardHeader
          blocView={blocView}
          setBlocView={setBlocView}
          handleSave={handleSave}
          disableSave={disableSave}
          currentCollage={currentCollage}
          setCurrentCollage={setCurrentCollage}
          setSelectedHighlights={setSelectedHighlights}
          showCollage={showCollage}
          setShowCollage={setShowCollage}
          setDisplayAllCollages={setDisplayAllCollages}
        />
        {showCollage ? (
          <StrictModeDroppable droppableId="highlights">
            {(provided) => {
              return (
                <Board {...provided.droppableProps} ref={provided.innerRef}>
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
        ) : (
          <NoCollageMessage />
        )}
      </DroppableContainer>
    </>
  );
};

export default CollageBoard;
