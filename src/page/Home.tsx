import { useAuthState } from "react-firebase-hooks/auth";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "../components/Button";
import { auth } from "../firebase";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HomeContainer = styled.div`
   {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Title = styled.h1`
  font-family: Fredoka One, Helvetica, Arial, sans-serif;
  align-self: center;
  font-size: 50px;
  margin: 5vh 0 7vh 0;

  span {
    color: var(--primary-dark);
  }
`;

const Header = styled.div`
   {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 60px;
    height: 60vh;
    width: 100%;
    background: var(--secondary);

    button {
      opacity: 0;
      font-size: 20px;
      padding: 15px 40px;
      animation: ${fadeIn} 1s ease-out forwards;
      animation-delay: 2s;
    }
  }
`;

const Text = styled.div`{
  width: 80%;
  font-size: 18px;
  font-family: Fredoka One, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;

  span {
    color: var(--accent-text);
  }

  @media (min-width: 768px) {
    width: 30%;
    text-align: left;
  }
}`

const AnimatedParagraph = styled.p<{delay: number}>`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: ${props => props.delay || 0}s;
`;

const Footer = styled.footer`
  color: var(--black);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  gap: 10px;
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: var(--primary-text);
  }
`;

const Home = () => {
  const [error] = useAuthState(auth);
  const navigate = useNavigate();

  if (error) {
    console.error(error);
  }

  return (
    <HomeContainer>
      <Title>Read<span>N</span>Collect</Title>
      <Header>
        <Text>
          <AnimatedParagraph delay={0.2}>1. Add an <span>article</span> by simply entering its URL</AnimatedParagraph>
          <AnimatedParagraph delay={0.7}>2. <span>Highlight</span> important points</AnimatedParagraph>
          <AnimatedParagraph delay={1.2}>3. Organise your highlights from any article in a single <span>collage</span></AnimatedParagraph>
        </Text>
        <Button onClick={() => navigate('/login')} square={true} border="var(--primary)" >Get Started</Button>
      </Header>
      <Footer>
        <p>Build with ♥ by <a href="https://github.com/JustineLo">Justine Lo</a></p>
        <p><FaGithub /> Repo : <a href="https://github.com/JustineLo/readncollect">ReadNCollect</a></p>
      </Footer>
    </HomeContainer>
  );
};

export default Home;
