import { createContainer } from "unstated-next";
import { useState } from "react";
import { Article, Highlight } from "../types/Article";
import { User } from "../types/User";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useAppState = () => {
  const [user, setUser] = useState<User>({
    docID: "",
    email: "",
  });
  const [articles, setArticles] = useState<Article[]>([]);

  return { user, setUser, articles, setArticles };
};

const AppState = createContainer(useAppState);

export default AppState;
