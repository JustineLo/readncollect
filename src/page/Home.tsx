import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const HomeContainer = styled.div`
   {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Header = styled.div`
   {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60vh;
    width: 100%;
    background: var(--purple-medium-transparent);
  }
`;

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    </nav>
  );
}

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <HomeContainer>
      <Navbar />
      <Header>ReadNCollect</Header>
    </HomeContainer>
  );
};

export default Home;
