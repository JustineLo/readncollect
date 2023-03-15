import { useState } from "react";
import { useContainer } from "unstated-next";
import ArticleHighlights from "../components/ArticleHighlights";
import Input from "../components/Input";
import AppState from "../state/AppState";
import { Article, Highlight } from "../types/Article";
import { getSearchedArticles } from "../utils/searchUtils";

interface AllHighlightsListProps {
  selectHighlight: (highlight: Highlight) => void;
}

const AllHighlightsList = ({ selectHighlight }: AllHighlightsListProps) => {
  const { user, processedArticles } = useContainer(AppState);
  const [displayedArticles, setDisplayedArticles] =
    useState<Article[]>(processedArticles);
  const [searchQuery, setSearchQuery] = useState<string>("");

  function onInputChange(e: any): void {
    const input = e.target.value;
    setSearchQuery(input);
    setDisplayedArticles(getSearchedArticles(processedArticles, input));
  }

  return (
    <>
      <Input type="text" value={searchQuery} onChange={onInputChange} />
      <ArticleHighlights
        title="Unlinked highlights"
        highlights={user.soloHighlights}
        selectHighlight={selectHighlight}
      />
      {displayedArticles.length > 0 &&
        displayedArticles.map((article: Article) => (
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
