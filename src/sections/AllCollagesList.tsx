import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import CollageThumbnail from "../components/CollageThumbnail";
import Input from "../components/Input";
import AppState from "../state/AppState";
import { Collage, Highlight } from "../types/Article";
import { getSearchedCollages } from "../utils/searchUtils";

interface AllCollagesListProps {
  setCurrentCollage: Dispatch<SetStateAction<Collage>>;
  setSelectedHighlights: (highlights: Highlight[]) => void;
  setShowCollage: Dispatch<SetStateAction<boolean>>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
`;

const Thumbnails = styled.div`
  display: flex;
  padding: 20px 0;
  gap: 20px;
  width: 90%;
  overflow-x: auto;
  white-space: nowrap;
  box-sizing: border-box;

  @media (min-width: 768px) {
    gap: 30px;
    overflow-x: hidden;
    flex-direction: column;
  }
`;

const AllCollagesList = ({
  setCurrentCollage,
  setSelectedHighlights,
  setShowCollage,
}: AllCollagesListProps) => {
  const { user } = useContainer(AppState);
  const [displayedCollages, setDisplayedCollages] = useState<Collage[]>(
    user.collages
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setDisplayedCollages(user.collages);
  }, [user.collages]);

  function selectCollage(collageID: string): void {
    const collage = user.collages.find((collage) => collage.id === collageID);
    if (!collage) return;
    setCurrentCollage(collage);
    setSelectedHighlights(collage.highlights);
    setShowCollage(true);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const input = e.target.value;
    setSearchQuery(input);
    setDisplayedCollages(getSearchedCollages(user.collages, input));
  }

  return (
    <Container>
      <Input
        type="text"
        value={searchQuery}
        onChange={onInputChange}
        width="50%"
        placeholder="Search collages"
      />
      <Thumbnails>
        {displayedCollages.map((collage) => (
          <CollageThumbnail
            key={collage.id}
            title={collage.title}
            excerpt={collage.excerpt}
            selectCollage={() => selectCollage(collage.id)}
          />
        ))}
      </Thumbnails>
    </Container>
  );
};

export default AllCollagesList;
