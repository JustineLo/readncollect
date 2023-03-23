import { uuidv4 } from "@firebase/util";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import TabLink from "../components/TabLink";
import { auth } from "../firebase";
import AllCollagesList from "../sections/AllCollagesList";
import AllHighlightsList from "../sections/AllHighlightsLists";
import CollageBoard from "../sections/CollageBoard";
import AppState from "../state/AppState";
import { Collage, Highlight } from "../types/Article";

interface CollageBuilderProps {}

const GlobalContainer = styled.div`
  width: 100vw;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  margin: 2rem 0;
`;

const HighlightsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--primary-light);
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 50%;
    padding: 0 5%;
    height: 100vh;
    overflow-y: scroll;
  }
`;

function CollageBuilder({}: CollageBuilderProps): JSX.Element {
  const { user } = useContainer(AppState);
  const [userAuth, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [displayAllCollages, setDisplayAllCollages] = useState(true);
  const [selectedHighlights, setSelectedHighlights] = useState<Highlight[]>([]);
  const [showCollage, setShowCollage] = useState(false);
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
  }, []);

  function handleOnDragEnd(result: any): void {
    if (!result) return;
    const content = [...selectedHighlights];
    const [reorderedItem] = content.splice(result.source.index, 1);
    content.splice(result.destination.index, 0, reorderedItem);
    setSelectedHighlights(content);
  }

  function selectHighlight(highlight: Highlight): void {
    setSelectedHighlights((prev) => [...prev, { ...highlight, id: uuidv4() }]);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <GlobalContainer>
        <CollageBoard
          currentCollage={currentCollage}
          setCurrentCollage={setCurrentCollage}
          selectedHighlights={selectedHighlights}
          setSelectedHighlights={setSelectedHighlights}
          showCollage={showCollage}
          setShowCollage={setShowCollage}
          setDisplayAllCollages={setDisplayAllCollages}
        />
        <HighlightsContainer>
          <Tabs>
            <TabLink
              onClick={() => setDisplayAllCollages(true)}
              active={displayAllCollages}
            >
              All collages
            </TabLink>
            <TabLink
              onClick={() => setDisplayAllCollages(false)}
              active={!displayAllCollages}
            >
              All highlights
            </TabLink>
          </Tabs>
          {displayAllCollages ? (
            <AllCollagesList
              setCurrentCollage={setCurrentCollage}
              setSelectedHighlights={setSelectedHighlights}
              setShowCollage={setShowCollage}
            />
          ) : (
            <AllHighlightsList selectHighlight={selectHighlight} />
          )}
        </HighlightsContainer>
      </GlobalContainer>
    </DragDropContext>
  );
}

export default CollageBuilder;
