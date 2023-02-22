import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "firebase/firestore";
import { Article } from "../types/Article";
import { User } from "../types/User";
import AppState from "../state/AppState";
import { useContainer } from "unstated-next";
import HighlightFactory from "./HighlightFactory";

function Home() {
  const addArticleApi: string = import.meta.env.VITE_API_ADD_ARTICLE;
  const [userAuth, loading, error] = useAuthState(auth);
  const { user, setUser, articles, setArticles } = useContainer(AppState);
  const [newUrl, setNewUrl] = useState<string>("");
  const [clickedArticle, setClickedArticle] = useState<Article>({
    articleDocID: "",
    url: "",
  } as Article);
  const [openHighlightFactory, setOpenHighlightFactory] =
    useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return navigate("/login");
    fetchUser();
  }, [userAuth, loading]);

  const fetchUser = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("uid", "==", userAuth?.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUser({ docID: doc.docs[0].id, email: data.email } as User);
      fetchArticles(doc.docs[0].id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchArticles = async (userDocID: string) => {
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

  const handleSubmitTest = (event: any) => {
    event.preventDefault();
    axios
      .post(addArticleApi, { userDocID: user?.docID, url: newUrl })
      .then((response) => {
        setArticles([...articles, response.data]);
      })
      .catch(function (error: any) {
        console.error(error);
      });
  };

  function onClickArticle(article: Article): void {
    setClickedArticle(article);
    setOpenHighlightFactory(true);
  }

  function onDeleteArticle(articleDocID: string): void {
    deleteDoc(doc(db, `users/${user?.docID}/articles/${articleDocID}`))
      .then(() => {
        const filteredArticles = articles.filter(
          (article) => article.articleDocID !== articleDocID
        );
        setArticles(filteredArticles);
      })
      .catch((error) => {
        console.error("Error deleting article: ", error);
      });
  }

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmitTest}>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button type="submit">Submit ARTICLE</button>
        </form>
      </div>
      <div>
        {articles.map((article: Article, index: number) => (
          <div key={index}>
            <button onClick={() => onClickArticle(article)}>
              {article.title}
            </button>
            <button onClick={() => onDeleteArticle(article.articleDocID)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="dashboard">
        <div className="dashboard__container">
          Logged in as
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {openHighlightFactory && (
        <HighlightFactory
          setOpen={setOpenHighlightFactory}
          article={clickedArticle}
        />
      )}
    </>
  );
}

export default Home;
