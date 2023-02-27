import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import styled from "styled-components";
import { default as Dashboard, default as Home } from "./page/Dashboard";
import Login from "./page/Login";
import Signup from "./page/Signup";

const AppContainer = styled.main`
  display: flex;
`;

const MainContainer = styled.div`
  width: 100%;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
