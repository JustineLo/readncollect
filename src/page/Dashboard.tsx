import axios from "axios";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import ArticleThumbnail from "../components/ArticleThumbnail";
import Button from "../components/Button";
import EllipsisLoader from "../components/EllipsisLoader";
import Input from "../components/Input";
import { auth, db } from "../firebase";
import AppState from "../state/AppState";
import { Article } from "../types/Article";
import { getPicture } from "../utils/articleUtils";
import { getSearchedArticles } from "../utils/searchUtils";

const GlobalContainer = styled.div`
  width: 100vw;
  display: flex;
  height: 100vh;
  overflow-y: scroll;

  @media (min-width: 768px) {
    width: 100vw;
  }
`;
const MainContainer = styled.div`
  width: 100%;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding-bottom: 80px;
  @media (min-width: 768px) {
    margin-top: 80px;
    gap: 60px;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ArticlesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
  }
`;

function Dashboard() {
  const addArticleApi: string = import.meta.env.VITE_API_ADD_ARTICLE;
  const [userAuth, loading, error] = useAuthState(auth);
  const {
    user,
    articles,
    setArticles,
    processedArticles,
    unProcessedArticles,
  } = useContainer(AppState);
  const [newUrl, setNewUrl] = useState<string>("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [searchedArticles, setSearchedArticles] =
    useState<Article[]>(processedArticles);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return navigate("/login");
  }, [userAuth, loading]);

  useEffect(() => {
    setSearchedArticles(processedArticles);
    setSearchQuery("");
  }, [processedArticles]);

  const handleSubmitTest = (
    event: any,
    setLoadingSpinner: (loading: boolean) => void
  ) => {
    event.preventDefault();
    setLoadingSpinner(true);
    axios
      .post(addArticleApi, {
        userDocID: user?.docID,
        url: newUrl,
        image: getPicture(articles.length % 12),
      })
      .then((response) => {
        setArticles([...articles, response.data]);
      })
      .catch(function (error: any) {
        console.error(error);
      })
      .finally(() => {
        setLoadingSpinner(false);
        setNewUrl("");
      });
  };

  function onDeleteArticle(articleDocID: string): void {
    deleteDoc(doc(db, `users/${user?.docID}/articles/`, articleDocID))
      .then(() => {
        setArticles(
          articles.filter((article) => article.articleDocID !== articleDocID)
        );
      })
      .catch((error) => {
        console.error("Error deleting article: ", error);
      });
  }

  function onInputChange(e: any): void {
    const input = e.target.value;
    setSearchQuery(input);
    setSearchedArticles(getSearchedArticles(processedArticles, input, true));
  }
  return (
    <GlobalContainer>
      <MainContainer>
        <DashboardContainer>
          <h3>Article's URL :</h3>
          <Form
            onSubmit={(event) => handleSubmitTest(event, setLoadingSpinner)}
          >
            <Input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://www.blog.com/article/18"
            />
            <Button type="submit">
              {loadingSpinner ? <EllipsisLoader /> : "Add article"}
            </Button>
          </Form>
          {unProcessedArticles.length > 0 && <><h3>Unprocessed articles</h3>
          <ArticlesContainer>
            {unProcessedArticles.map((article: Article, index: number) => (
              <ArticleThumbnail
                key={index}
                article={article}
                onDeleteArticle={() => onDeleteArticle(article.articleDocID)}
              />
            ))}
          </ArticlesContainer>
          </>}
          <h3>Processed articles</h3>
          <Input
            type="text"
            value={searchQuery}
            onChange={onInputChange}
            placeholder="Search processed articles"
          />
          <ArticlesContainer>
            {searchedArticles.map((article: Article, index: number) => (
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
