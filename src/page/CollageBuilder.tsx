import { uuidv4 } from "@firebase/util";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import ArticleHighlights from "../components/ArticleHighlights";
import Button from "../components/Button";
import CollageThumbnail from "../components/CollageThumbnail";
import { auth } from "../firebase";
import CollageBoard from "../sections/CollageBoard";
import Sidebar from "../sections/Sidebar";
import AppState from "../state/AppState";
import { Article, Collage, Highlight } from "../types/Article";

interface CollageBuilderProps {}

const GlobalContainer = styled.div`
  width: 100vw;
  display: flex;
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
  const [displayAllCollages, setDisplayAllCollages] = useState(false);
  const [selectedHighlights, setSelectedHighlights] = useState<Highlight[]>([]);
  const [currentCollage, setCurrentCollage] = useState<Collage>({
    id: "",
    title: "",
    highlights: [],
    excerpt: "",
    createdAt: "",
  });

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return navigate("/login");
  }, [userAuth, loading]);

  useEffect(() => {
    if (user && user.collages.length > 0) {
      const lastCollage = user.collages[user.collages.length - 1];
      setCurrentCollage(lastCollage);
      setSelectedHighlights(lastCollage.highlights);
    }
  }, [user]);

  function handleOnDragEnd(result: any): void {
    if (!result) return;
    const content = [...selectedHighlights];
    const [reorderedItem] = content.splice(result.source.index, 1);
    content.splice(result.destination.index, 0, reorderedItem);
    setSelectedHighlights(content);
  }

  function handleHighlightClick(highlight: Highlight): void {
    setSelectedHighlights((prev) => [...prev, { ...highlight, id: uuidv4() }]);
  }

  function selectCollage(collageID: string): void {
    const collage = user.collages.find((collage) => collage.id === collageID);
    if (!collage) return;
    setCurrentCollage(collage);
    setSelectedHighlights(collage.highlights);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <GlobalContainer>
        <Sidebar />
        <CollageBoard
          currentCollage={currentCollage}
          setCurrentCollage={setCurrentCollage}
          selectedHighlights={selectedHighlights}
          setSelectedHighlights={setSelectedHighlights}
        />
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
            <div>
              {user.collages.map((collage) => (
                <CollageThumbnail
                  key={collage.id}
                  title={collage.title}
                  excerpt={collage.highlights[0].text}
                  selectCollage={() => selectCollage(collage.id)}
                />
              ))}
            </div>
          ) : (
            <>
              <ArticleHighlights
                title="Unlinked highlights"
                highlights={user.soloHighlights}
                selectHighlight={handleHighlightClick}
              />
              {processedArticles.length > 0 &&
                processedArticles.map((article: Article) => (
                  <ArticleHighlights
                    key={article.articleDocID}
                    title={article.title}
                    highlights={article.highlights}
                    selectHighlight={handleHighlightClick}
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
