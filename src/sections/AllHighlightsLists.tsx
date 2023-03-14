import { useContainer } from "unstated-next";
import ArticleHighlights from "../components/ArticleHighlights";
import AppState from "../state/AppState";
import { Article, Highlight } from "../types/Article";

interface AllHighlightsListProps {
  selectHighlight: (highlight: Highlight) => void;
}

const AllHighlightsList = ({ selectHighlight }: AllHighlightsListProps) => {
  const { user, processedArticles } = useContainer(AppState);

  return (
    <>
      <ArticleHighlights
        title="Unlinked highlights"
        highlights={user.soloHighlights}
        selectHighlight={selectHighlight}
      />
      {processedArticles.length > 0 &&
        processedArticles.map((article: Article) => (
          <ArticleHighlights
            key={article.articleDocID}
            title={article.title}
            highlights={article.highlights}
            selectHighlight={selectHighlight}
          />
        ))}
    </>
  );
};

export default AllHighlightsList;
