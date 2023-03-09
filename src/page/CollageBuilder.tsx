import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import HighlightsList from "../components/HighlightsList";
import { auth } from "../firebase";
import Sidebar from "../sections/Sidebar";
import AppState from "../state/AppState";
import { Article } from "../types/Article";

interface CollageBuilderProps {}

const GlobalContainer = styled.div`
  width: 100vw;
  display: flex;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const ArticleContainer = styled.div`
  width: 60%;
  padding: 30px;
`;

const HighlightsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
  background-color: var(--purple-medium-transparent);
`;

function CollageBuilder({}: CollageBuilderProps): JSX.Element {
  const { user, articles, setArticles, processedArticles } =
    useContainer(AppState);
  const [userAuth, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return navigate("/login");
  }, [userAuth, loading]);

  return (
    <>
      <GlobalContainer>
        <Sidebar />
        <Board></Board>
        <HighlightsContainer>
          <HighlightsList
            title="General highlights"
            highlights={user.soloHighlights}
          />
          {processedArticles.length > 0 &&
            processedArticles.map((article: Article) => (
              <HighlightsList
                title={article.title}
                highlights={article.highlights}
              />
            ))}
        </HighlightsContainer>
      </GlobalContainer>
    </>
  );
}

export default CollageBuilder;
