import { createContainer } from "unstated-next";
import { useState } from "react";
import { Article, Highlight } from "../types/Article";
import { User } from "../types/User";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useAppState = () => {
  const [user, setUser] = useState<User>({
    docID: "",
    email: "",
  });
  const [articles, setArticles] = useState<Article[]>([]);

  function updateArticleHighlights(
    articleDocID: string,
    highlights: Highlight[]
  ) {
    const updatedArticles = articles.map((article) => {
      if (article.articleDocID === articleDocID) {
        updateDoc(doc(db, `users/${user.docID}/articles/${articleDocID}`), {
          ...article,
          highlights,
        });
        return { ...article, highlights };
      } else {
        return article;
      }
    });

    setArticles(updatedArticles);
  }

  return { user, setUser, articles, setArticles, updateArticleHighlights };
};

const AppState = createContainer(useAppState);

export default AppState;
