import { doc, updateDoc } from "firebase/firestore";
import { useContainer } from "unstated-next";
import { db } from "../firebase";
import AppState from "../state/AppState";
import { Article, Highlight } from "../types/Article";
import { User } from "../types/User";

export function getUpdatedArticles(
  user: User,
  articles: Article[],
  articleDocID: string,
  highlights: Highlight[]
): Article[] {
  return articles.map((article) => {
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
}
