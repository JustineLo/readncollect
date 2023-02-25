import Home from "./page/Dashboard";
import Signup from "./page/Signup";
import Login from "./page/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import styled from "styled-components";
import Sidebar from "./sections/Sidebar";
import "react-tooltip/dist/react-tooltip.css";

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
