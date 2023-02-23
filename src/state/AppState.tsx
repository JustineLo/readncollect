import { createContainer } from "unstated-next";
import { useState } from "react";
import { Article } from "../types/Article";
import { User } from "../types/User";

const useAppState = () => {
  const [user, setUser] = useState<User>({
    docID: "",
    email: "",
  });
  const [articles, setArticles] = useState<Article[]>([]);

  function updateArticleHighlights(articleDocID: string, highlights: Article) {
    const newArticles = articles.map((article) => {
      if (article.articleDocID === articleDocID) {
        return highlights;
      } else {
        return article;
      }
    });
    setArticles(newArticles);
  }

  return { user, setUser, articles, setArticles, updateArticleHighlights };
};

const AppState = createContainer(useAppState);

export default AppState;
