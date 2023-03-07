import axios from "axios";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import ArticleThumbnail from "../components/ArticleThumbnail";
import Button from "../components/Button";
import Input from "../components/Input";
import { auth, db } from "../firebase";
import Sidebar from "../sections/Sidebar";
import AppState from "../state/AppState";
import { Article } from "../types/Article";
import { getRandomPicture } from "../utils/articleUtils";
import { fetchData } from "../utils/fetchData";

const GlobalContainer = styled.div`
  width: 100%;
  display: flex;
`;
const MainContainer = styled.div`
  width: 100%;
`;

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

const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Dashboard() {
  const addArticleApi: string = import.meta.env.VITE_API_ADD_ARTICLE;
  const [userAuth, loading, error] = useAuthState(auth);
  const { user, setUser, articles, setArticles } = useContainer(AppState);
  const [newUrl, setNewUrl] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return navigate("/login");
    fetchData(userAuth, setUser, setArticles);
  }, [userAuth, loading]);

  const handleSubmitTest = (event: any) => {
    event.preventDefault();
    axios
      .post(addArticleApi, {
        userDocID: user?.docID,
        url: newUrl,
        image: getRandomPicture(),
      })
      .then((response) => {
        setArticles([...articles, response.data]);
      })
      .catch(function (error: any) {
        console.error(error);
      });
  };

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
    <GlobalContainer>
      <Sidebar />
      <MainContainer>
        <DashboardContainer>
          <Form onSubmit={handleSubmitTest}>
            <label htmlFor="url">URL</label>
            <Input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <Button type="submit">Add article !</Button>
          </Form>
          <ArticlesContainer>
            {articles.map((article: Article, index: number) => (
              <ArticleThumbnail
                key={index}
                article={article}
                onDeleteArticle={() => onDeleteArticle(article.articleDocID)}
              />
            ))}
          </ArticlesContainer>
        </DashboardContainer>
      </MainContainer>
    </GlobalContainer>
  );
}

export default Dashboard;
