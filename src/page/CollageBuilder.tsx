import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import HighlightsList from "../components/HighlightsList";
import HighlightThumbnail from "../components/HighlightThumbnail";
import { auth, db } from "../firebase";
import Sidebar from "../sections/Sidebar";
import AppState from "../state/AppState";
import { Article, Collage, Highlight } from "../types/Article";
import { StrictModeDroppable as Droppable } from "../utils/StrictModeDroppable";

interface CollageBuilderProps {}

const GlobalContainer = styled.div`
  width: 100vw;
  display: flex;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 2% 5%;
  box-sizing: border-box;
  gap: 1rem;
`;
const ArticleContainer = styled.div`
  width: 60%;
  padding: 30px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
`;

const HighlightsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
  background-color: var(--purple-medium-transparent);
`;

function CollageBuilder({}: CollageBuilderProps): JSX.Element {
  const { user, setUser, processedArticles } = useContainer(AppState);
  const [userAuth, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [currentCollage, setCurrentCollage] = useState<Collage>({
    id: uuidv4(),
    title: "",
    highlights: [],
    createdAt: new Date().toISOString(),
  });
  const [selectedHighlights, setSelectedHighlights] = useState<Highlight[]>([]);
  const [displayAllCollages, setDisplayAllCollages] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return navigate("/login");
  }, [userAuth, loading]);

  useEffect(() => {
    setCurrentCollage((prev) => ({
      ...prev,
      highlights: selectedHighlights,
    }));
  }, [selectedHighlights]);

  function handleOnDragEnd(result: any): void {
    if (!result) return;
    const content = [...selectedHighlights];
    const [reorderedItem] = content.splice(result.source.index, 1);
    content.splice(result.destination.index, 0, reorderedItem);
    setSelectedHighlights(content);
  }

  function handleHighlightClick(highlight: Highlight): void {
    setSelectedHighlights((prev) => [
      ...prev,
      { ...highlight, id: highlight.id + prev.length },
    ]);
  }

  function handleSave(): void {
    const userRef = doc(db, `users/${user.docID}`);
    setUser({
      ...user,
      collages: [...user.collages, currentCollage],
    });
    updateDoc(userRef, {
      collages: [...user.collages, currentCollage],
    })
      .then(() => {
        console.log("soloHighlights updated successfully");
      })
      .catch((error) => {
        console.error("Error updating soloHighlights:", error);
      });
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <GlobalContainer>
        <Sidebar />
        <Droppable droppableId="highlights">
          {(provided) => {
            return (
              <Board {...provided.droppableProps} ref={provided.innerRef}>
                <>
                  <Button onClick={handleSave}>SAVE COLLAGE</Button>
                  {selectedHighlights.map((highlight, index) => (
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
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </>
              </Board>
            );
          }}
        </Droppable>

        <HighlightsContainer>
          <Tabs>
            <Button onClick={() => setDisplayAllCollages(false)}>
              All highlights
            </Button>
            <Button onClick={() => setDisplayAllCollages(true)}>
              All collages
            </Button>
          </Tabs>

          {displayAllCollages ? (
            <div>COLLAGES</div>
          ) : (
            <>
              <HighlightsList
                title="General highlights"
                highlights={user.soloHighlights}
                handleClick={handleHighlightClick}
              />
              {processedArticles.length > 0 &&
                processedArticles.map((article: Article) => (
                  <HighlightsList
                    key={article.articleDocID}
                    title={article.title}
                    highlights={article.highlights}
                    handleClick={handleHighlightClick}
                  />
                ))}
            </>
          )}
        </HighlightsContainer>
      </GlobalContainer>
    </DragDropContext>
  );
}

export default CollageBuilder;
