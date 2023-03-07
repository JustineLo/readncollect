export type Article = {
  articleDocID: string;
  title: string;
  url: string;
  image: string;
  createdAt: string;
  zContent: string;
  highlights: Highlight[];
};

export type Highlight = {
  id: string;
  text: string;
  tags: string[];
};
