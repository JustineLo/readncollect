import { Collage, Highlight } from "./Article";

export type User = {
  docID: string;
  email: string;
  soloHighlights: Highlight[];
  collages: Collage[];
};
