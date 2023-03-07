import { useState } from "react";
import { createContainer } from "unstated-next";
import { Article } from "../types/Article";
import { User } from "../types/User";

const useAppState = () => {
  const [user, setUser] = useState<User>({
    docID: "",
    email: "",
    soloHighlights: [],
  });
  const [articles, setArticles] = useState<Article[]>([]);

  return { user, setUser, articles, setArticles };
};

const AppState = createContainer(useAppState);

export default AppState;
