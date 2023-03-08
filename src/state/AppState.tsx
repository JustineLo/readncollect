import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { Article } from "../types/Article";
import { User } from "../types/User";

const useAppState = () => {
  const [user, setUser] = useState<User>({
    docID: "",
    email: "",
    soloHighlights: [],
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [processedArticles, setProcessedArticles] = useState<Article[]>([]);
  const [unProcessedArticles, setUnprocessedArticles] = useState<Article[]>([]);
  useEffect(() => {
    setUnprocessedArticles(
      articles
        .filter((article) => article.highlights.length === 0)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    );
    setProcessedArticles(
      articles
        .filter((article) => article.highlights.length > 0)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    );
  }, [articles]);

  return {
    user,
    setUser,
    articles,
    setArticles,
    unProcessedArticles,
    processedArticles,
  };
};

const AppState = createContainer(useAppState);

export default AppState;
