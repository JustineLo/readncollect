import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { auth, signInWithGoogle } from "../firebase";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  a,
  a:visited {
    color: var(--pink);
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/articles");
  }, [user, loading]);

  return (
    <>
      <Container>
        <h1>Login</h1>
        <Form>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Buttons>
            <Button
              onClick={() => signInWithEmailAndPassword(auth, email, password)}
            >
              Login
            </Button>
            <Button onClick={signInWithGoogle} backgroundColor="transparent">
              <FcGoogle />
              Login with Google
            </Button>
          </Buttons>
        </Form>
        <Links>
          <Link to="/reset">Forgot Password</Link>
          <span>
            Don't have an account? <Link to="/signup">Register</Link> now.
          </span>
        </Links>
      </Container>
    </>
  );
};

export default Login;
