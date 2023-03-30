import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import styled from "styled-components";
import { useContainer } from "unstated-next";
import { auth } from "./firebase";
import CollageBuilder from "./page/CollageBuilder";
import Dashboard from "./page/Dashboard";
import HighlightFactory from "./page/HighlightFactory";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Layout from "./sections/Layout";
import AppState from "./state/AppState";
import { fetchData } from "./utils/fetchData";

const AppContainer = styled.main`
  display: flex;
`;

function App() {
  const [userAuth] = useAuthState(auth);
  const { setUser, setArticles } = useContainer(AppState);

  useEffect(() => {
    if (userAuth) fetchData(userAuth, setUser, setArticles);
  }, [userAuth]);

  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/articles" element={<Dashboard />} />
            <Route path="/highlightfactory/:id" element={<HighlightFactory />} />
            <Route path="/collagefactory" element={<CollageBuilder />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
