import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input";
import { auth, db } from "../firebase";

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

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Get the reference to the user's document in Firestore
        updateDoc(doc(db, "users", user.uid), { soloHighlights: [] });
        navigate("/dashboard");
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
          <button type="submit" onClick={onSubmit}>
            Sign up
          </button>
        </Buttons>
      </Form>

      <Links>
        Already have an account? <NavLink to="/login">Sign in</NavLink>
      </Links>
    </Container>
  );
};

export default Signup;
