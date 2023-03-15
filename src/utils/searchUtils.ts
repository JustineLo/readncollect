import { Article, Collage } from "../types/Article";

export function getSearchedArticles(
  articles: Article[],
  searchQuery: string
): Article[] {
  const results = articles.filter((article) => {
    const searchInTitle = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const searchInHighlights = article.highlights.some((highlight) =>
      highlight.text.toLowerCase().includes(searchQuery)
    );
    return searchInTitle || searchInHighlights;
  });

  return results;
}

export function getSearchedCollages(
  collages: Collage[],
  searchQuery: string
): Collage[] {
  const results = collages.filter((collage) => {
    const searchInTitle = collage.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const searchInHighlights = collage.highlights.some((highlight) =>
      highlight.text.toLowerCase().includes(searchQuery)
    );
    return searchInTitle || searchInHighlights;
  });

  return results;
}
