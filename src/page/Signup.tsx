import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { auth, db, signInWithGoogle } from "../firebase";

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
  @media (min-width: 768px) {
    flex-direction: row;
  }
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

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/articles");
    console.log(user);
  }, [user, loading]);

  const onSubmit = async (auth: Auth, email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
          addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
            soloHighlights: [],
            collages: [],
          });
        }
        navigate("/articles");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <Container>
      <h1> Sign up </h1>
      <Form>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Buttons>
          <Button onClick={() => onSubmit(auth, email, password)}>
            Sign up
          </Button>
          <Button onClick={signInWithGoogle} backgroundColor="transparent">
            <FcGoogle />
            Sign up with Google
          </Button>
        </Buttons>
      </Form>

      <Links>
        Already have an account? <NavLink to="/login">Sign in</NavLink>
      </Links>
    </Container>
  );
};

export default Signup;
