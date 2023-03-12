import { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import HighlightsList from "../components/HighlightsList";
import HighlightThumbnail from "../components/HighlightThumbnail";
import { auth } from "../firebase";
import Sidebar from "../sections/Sidebar";
import AppState from "../state/AppState";
import { Article, Highlight } from "../types/Article";
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
`;
const ArticleContainer = styled.div`
  width: 60%;
  padding: 30px;
`;

const HighlightsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
  background-color: var(--purple-medium-transparent);
`;

function CollageBuilder({}: CollageBuilderProps): JSX.Element {
  const { user, articles, setArticles, processedArticles } =
    useContainer(AppState);
  const [userAuth, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [selectedHighlights, setSelectedHighlights] = useState<Highlight[]>(
    user.soloHighlights
  );

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return navigate("/login");
  }, [userAuth, loading]);

  const handleOnDragEnd = (result: any) => {
    if (!result) return;
    const content = [...selectedHighlights];
    const [reorderedItem] = content.splice(result.source.index, 1);
    content.splice(result.destination.index, 0, reorderedItem);
    setSelectedHighlights(content);
  };

  const handleHighlightClick = (highlight: Highlight) => {
    setSelectedHighlights((prev) => [...prev, highlight]);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <GlobalContainer>
        <Sidebar />
        <Droppable droppableId="highlights">
          {(provided) => {
            return (
              <Board {...provided.droppableProps} ref={provided.innerRef}>
                <>
                  {selectedHighlights.map((highlight, index) => (
                    <Draggable
                      key={highlight.id + index}
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
                            <HighlightThumbnail highlight={highlight} />
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
          <HighlightsList
            title="General highlights"
            highlights={user.soloHighlights}
            handleClick={handleHighlightClick}
          />
          {processedArticles.length > 0 &&
            processedArticles.map((article: Article) => (
              <HighlightsList
                title={article.title}
                highlights={article.highlights}
                handleClick={handleHighlightClick}
              />
            ))}
        </HighlightsContainer>
      </GlobalContainer>
    </DragDropContext>
  );
}

export default CollageBuilder;
