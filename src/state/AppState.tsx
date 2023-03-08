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
      articles.filter((article) => article.highlights.length === 0)
    );
    setProcessedArticles(
      articles.filter((article) => article.highlights.length > 0)
    );
  }, [articles]);

  return {
    user,
    setUser,
    articles,
    setArticles,
    unProcessedArticles,
    setUnprocessedArticles,
    processedArticles,
  };
};

const AppState = createContainer(useAppState);

export default AppState;
