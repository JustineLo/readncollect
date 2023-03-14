import { Dispatch, SetStateAction } from "react";
import { useContainer } from "unstated-next";
import CollageThumbnail from "../components/CollageThumbnail";
import AppState from "../state/AppState";
import { Collage, Highlight } from "../types/Article";

interface AllCollagesListProps {
  setCurrentCollage: Dispatch<SetStateAction<Collage>>;
  setSelectedHighlights: (highlights: Highlight[]) => void;
}

const AllCollagesList = ({
  setCurrentCollage,
  setSelectedHighlights,
}: AllCollagesListProps) => {
  const { user } = useContainer(AppState);

  function selectCollage(collageID: string): void {
    const collage = user.collages.find((collage) => collage.id === collageID);
    if (!collage) return;
    setCurrentCollage(collage);
    setSelectedHighlights(collage.highlights);
  }

  return (
    <div>
      {user.collages.map((collage) => (
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
