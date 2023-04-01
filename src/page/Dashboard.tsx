import axios, { AxiosError } from "axios";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Fade } from 'react-awesome-reveal';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import ArticleThumbnail from "../components/ArticleThumbnail";
import Button from "../components/Button";
import DeleteModal from "../components/DeleteModal";
import EllipsisLoader from "../components/EllipsisLoader";
import Input from "../components/Input";
import { auth, db } from "../firebase";
import AppState from "../state/AppState";
import { Article } from "../types/Article";
import { getPicture } from "../utils/articleUtils";
import { fetchArticles } from "../utils/fetchData";
import { getSearchedArticles } from "../utils/searchUtils";

const MAX_ARTICLES_LENGTH = 25;

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

const LimitMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  text-align: center;
`;

function Dashboard() {
  const addArticleApi: string = import.meta.env.VITE_API_ADD_ARTICLE;
  const [userAuth, loading, error] = useAuthState(auth);
  const {
    user,
    setUser,
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
  const [limitReached, setLimitReached] = useState<boolean>(false);
  const [deletedArticle, setDeletedArticle] = useState<Article | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return navigate("/login");
  }, [userAuth, loading]);

  useEffect(() => {
    setSearchedArticles(processedArticles);
    setSearchQuery("");
  }, [processedArticles]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
    setLoadingSpinner: (loading: boolean) => void
  ): void {
    event.preventDefault();
    if (articles.length < MAX_ARTICLES_LENGTH) {
    setLoadingSpinner(true);
    axios
      .post(addArticleApi, {
        userDocID: user?.docID,
        url: newUrl,
        image: getPicture(articles.length % 12),
      })
      .then(() => {
        fetchArticles(user?.docID, setArticles);
      })
      .catch(function (error: AxiosError) {
        console.error(error);
      })
      .finally(() => {
        setLoadingSpinner(false);
        setNewUrl("");
      });
    } else {
      setLimitReached(true);
    }
  };

  function onClickArticle(deletedArticle: Article): void {
    setDeleteModalOpen(true);
    setDeletedArticle(deletedArticle);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const input = e.target.value;
    setSearchQuery(input);
    setSearchedArticles(getSearchedArticles(processedArticles, input, true));
  }

  const onConfirmedDelete = () => {
    if (articles.length === MAX_ARTICLES_LENGTH) setLimitReached(false);
    if (deletedArticle === null) return;
    deleteDoc(doc(db, `users/${user?.docID}/articles/`, deletedArticle.articleDocID))
      .then(() => {
        setArticles(
          articles.filter((article) => article.articleDocID !== deletedArticle.articleDocID)
        );
      })
      .catch((error) => {
        console.error("Error deleting article: ", error);
      });

    if (deletedArticle.highlights.length > 0) {
      const userRef = doc(db, `users/${user.docID}`);
      setUser({
        ...user,
        soloHighlights: [...user.soloHighlights, ...deletedArticle.highlights],
      });
      updateDoc(userRef, {
        soloHighlights: [...user.soloHighlights, ...deletedArticle.highlights],
      })
        .catch((error) => {
          console.error("Error updating soloHighlights:", error);
        });
    }
    setDeleteModalOpen(false);
    setDeletedArticle(null);
  };


  return (
    <GlobalContainer>
      <MainContainer>
        <DashboardContainer>
          <h3>Article's URL :</h3>
          <div>
          <Form
            onSubmit={(event) => handleSubmit(event, setLoadingSpinner)}
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
          {limitReached && <LimitMessage>You have reached the maximum number of articles</LimitMessage>}
          </div>
          {unProcessedArticles.length > 0 && <><h3>Unprocessed articles</h3>
          <ArticlesContainer>
            {unProcessedArticles.map((article: Article, index: number) => (
              <Fade key={index} direction="up" delay={index * 400}>
                <ArticleThumbnail
                  article={article}
                  onClickArticle={() => onClickArticle(article)}
                />
              </Fade>
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
              <Fade  key={index} direction="up" delay={index * 400}>
                <ArticleThumbnail
                article={article}
                onClickArticle={() => onClickArticle(article)}
              />
              </Fade>
            ))}
          </ArticlesContainer>
        </DashboardContainer>
      </MainContainer>
      {deleteModalOpen && (
        <DeleteModal
        onConfirmedDelete={onConfirmedDelete}
        setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
    </GlobalContainer>
  );
}

export default Dashboard;
