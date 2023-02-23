import React, { useEffect, useState } from "react";
import { auth, signInWithGoogle } from "../firebase";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import Login from "./Login";

const Home = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <>
      <Login />
    </>
  );
};

export default Home;
