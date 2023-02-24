import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { Article } from "../types/Article";
import AppState from "../state/AppState";
import { useContainer } from "unstated-next";
import HighlightFactory from "./HighlightFactory";
import { fetchData } from "../utils/fetchData";
import { deleteDoc, doc } from "firebase/firestore";
import Input from "../components/Input";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;
  margin-top: 20vh;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

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
    <DashboardContainer>
      <Form onSubmit={handleSubmitTest}>
        <label htmlFor="url">URL</label>
        <Input type="text" value={newUrl} onChange={setNewUrl} />
        <button type="submit">Submit ARTICLE</button>
      </Form>
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
      {openHighlightFactory && (
        <HighlightFactory
          setOpen={setOpenHighlightFactory}
          article={clickedArticle}
        />
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
