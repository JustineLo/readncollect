import styled from "styled-components";
import { useContainer } from "unstated-next";
import Sidebar from "../sections/Sidebar";
import AppState from "../state/AppState";

interface CollageBuilderProps {}

const GlobalContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Board = styled.div`
  display: flex;
`;
const ArticleContainer = styled.div`
  width: 60%;
  padding: 30px;
`;

const HighlightsContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
`;

const HighlightsList = styled.div`
  width: 100%;
  margin: 60px 0;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 25px;
  overflow-y: scroll;
`;

function CollageBuilder({}: CollageBuilderProps): JSX.Element {
  const { user, articles, setArticles } = useContainer(AppState);

  return (
    <>
      <GlobalContainer>
        <Sidebar />
      </GlobalContainer>
    </>
  );
}

export default CollageBuilder;
