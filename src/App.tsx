import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import styled from "styled-components";
import CollageBuilder from "./page/CollageBuilder";
import Dashboard from "./page/Dashboard";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";

const AppContainer = styled.main`
  display: flex;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/collagebuilder" element={<CollageBuilder />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
