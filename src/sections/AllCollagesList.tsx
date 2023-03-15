import { Dispatch, SetStateAction, useState } from "react";
import { useContainer } from "unstated-next";
import CollageThumbnail from "../components/CollageThumbnail";
import Input from "../components/Input";
import AppState from "../state/AppState";
import { Collage, Highlight } from "../types/Article";
import { getSearchedCollages } from "../utils/searchUtils";
interface AllCollagesListProps {
  setCurrentCollage: Dispatch<SetStateAction<Collage>>;
  setSelectedHighlights: (highlights: Highlight[]) => void;
}

const AllCollagesList = ({
  setCurrentCollage,
  setSelectedHighlights,
}: AllCollagesListProps) => {
  const { user } = useContainer(AppState);
  const [displayedArticles, setDisplayedArticles] = useState<Collage[]>(
    user.collages
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  function selectCollage(collageID: string): void {
    const collage = user.collages.find((collage) => collage.id === collageID);
    if (!collage) return;
    setCurrentCollage(collage);
    setSelectedHighlights(collage.highlights);
  }

  function onInputChange(e: any): void {
    const input = e.target.value;
    setSearchQuery(input);
    setDisplayedArticles(getSearchedCollages(user.collages, input));
  }

  return (
    <div>
      <Input type="text" value={searchQuery} onChange={onInputChange} />
      {displayedArticles.map((collage) => (
        <CollageThumbnail
          key={collage.id}
          title={collage.title}
          excerpt={collage.excerpt}
          selectCollage={() => selectCollage(collage.id)}
        />
      ))}
    </div>
  );
};

export default AllCollagesList;
