import { useState } from "react";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import ArticleHighlights from "../components/ArticleHighlights";
import Input from "../components/Input";
import AppState from "../state/AppState";
import { Article, Highlight } from "../types/Article";
import { getSearchedArticles } from "../utils/searchUtils";

interface AllHighlightsListProps {
  selectHighlight: (highlight: Highlight) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
    <Container>
      <Input
        type="text"
        value={searchQuery}
        onChange={onInputChange}
        width="50%"
        placeholder="Search highlights"
      />
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
    </Container>
  );
};

export default AllHighlightsList;
