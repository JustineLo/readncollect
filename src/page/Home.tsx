import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
  const [name, setName] = useState("");
  const [docID, setDocID] = useState<string>("");
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any>([]);

  const addArticleApi: string = import.meta.env.VITE_API_ADD_ARTICLE;
  const [newUrl, setNewUrl] = useState<string>("");

  const handleSubmitTest = (event: any) => {
    event.preventDefault();
    axios
      .post(addArticleApi, { uid: user?.uid, url: newUrl })
      .catch(function (error: any) {
        console.error(error);
      });
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setDocID(doc.docs[0].id);
      const articles = await getDocs(
        collection(db, `users/${doc.docs[0].id}/articles`)
      );
      let articlesCollection: DocumentData[] = [];
      articles.docs.map((doc) => {
        articlesCollection.push(doc.data());
      });
      console.log(articlesCollection);
      setArticles(articlesCollection);
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
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
        {articles.map((article: any) => (
          <div key={article.id}>
            <a href={article.url}>{article.title}</a>
          </div>
        ))}
      </div>
      <div className="dashboard">
        <div className="dashboard__container">
          Logged in as
          <div>{name}</div>
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
