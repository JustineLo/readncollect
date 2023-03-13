import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Article } from "../types/Article";
import { User } from "../types/User";

export const fetchData = async (
  userAuth: any,
  setUser: any,
  setArticles: any
) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", userAuth?.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    setUser({
      docID: doc.docs[0].id,
      email: data.email,
      soloHighlights: data.soloHighlights,
      collages: data.collages,
    } as User);
    fetchArticles(doc.docs[0].id, setArticles);
  } catch (err) {
    console.error(err);
  }
};

export const fetchArticles = async (userDocID: string, setArticles: any) => {
  try {
    const articlesDocs = await getDocs(
      collection(db, `users/${userDocID}/articles`)
    );
    let articlesArray: Article[] = [];
    articlesDocs.docs.map((doc) => {
      const articleDocID: string = doc.id;
      const article: Article = { articleDocID, ...doc.data() } as Article;
      articlesArray.push(article);
    });
    setArticles(articlesArray);
  } catch (err) {
    console.error(err);
  }
};
