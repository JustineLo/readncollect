import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

  function onInputChange(e: any): void {
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

      {displayedCollages.map((collage) => (
        <CollageThumbnail
          key={collage.id}
          title={collage.title}
          excerpt={collage.excerpt}
          selectCollage={() => selectCollage(collage.id)}
        />
      ))}
    </Container>
  );
};

export default AllCollagesList;
