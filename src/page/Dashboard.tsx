import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { Article } from "../types/Article";
import AppState from "../state/AppState";
import { useContainer } from "unstated-next";
import HighlightFactory from "./HighlightFactory";
import { fetchData } from "../utils/fetchData";
import { deleteDoc, doc } from "firebase/firestore";

function Dashboard() {
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
    fetchData(userAuth, setUser, setArticles);
  }, [userAuth, loading]);

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
    deleteDoc(doc(db, `users/${user?.docID}/articles/`, articleDocID))
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

export default Dashboard;
