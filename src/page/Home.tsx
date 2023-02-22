import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  DocumentData,
} from "firebase/firestore";
import "firebase/firestore";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [userDocID, setUserDocID] = useState<string>("");
  const navigate = useNavigate();
  const [newUrl, setNewUrl] = useState<string>("");
  const [userEmail, setUserEmail] = useState("");
  const [articles, setArticles] = useState<any>([]);

  const addArticleApi: string = import.meta.env.VITE_API_ADD_ARTICLE;

  const handleSubmitTest = (event: any) => {
    event.preventDefault();
    axios
      .post(addArticleApi, { uid: user?.uid, url: newUrl })
      .then((response) => {
        setArticles([...articles, response.data]);
      })
      .catch(function (error: any) {
        console.error(error);
      });
  };

  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUserDocID(doc.docs[0].id);
      setUserEmail(data.email);
      fetchArticles(doc.docs[0].id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchArticles = async (userDocID: string) => {
    try {
      const articlesDocs = await getDocs(
        collection(db, `users/${userDocID}/articles`)
      );
      let articlesArray: DocumentData[] = [];
      articlesDocs.docs.map((doc) => {
        const articleDocID: string = doc.id;
        articlesArray.push({ ...doc.data(), articleDocID });
      });

      setArticles(articlesArray);
      console.log(articlesArray);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUser();
  }, [user, loading]);

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmitTest}>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button type="submit">Submit ARTICLE</button>
        </form>
      </div>
      <div>
        {articles.map((article: any, index: number) => (
          <div key={index}>
            <a href={article.url}>{article.title}</a>
          </div>
        ))}
      </div>
      <div className="dashboard">
        <div className="dashboard__container">
          Logged in as
          <div>{userEmail}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
