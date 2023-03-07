import { doc, updateDoc } from "firebase/firestore";
import img0 from "../assets/defaultimages/0.jpg";
import img1 from "../assets/defaultimages/1.jpg";
import img10 from "../assets/defaultimages/10.jpg";
import img11 from "../assets/defaultimages/11.jpg";
import img2 from "../assets/defaultimages/2.jpg";
import img3 from "../assets/defaultimages/3.jpg";
import img4 from "../assets/defaultimages/4.jpg";
import img5 from "../assets/defaultimages/5.jpg";
import img6 from "../assets/defaultimages/6.jpg";
import img7 from "../assets/defaultimages/7.jpg";
import img8 from "../assets/defaultimages/8.jpg";
import img9 from "../assets/defaultimages/9.jpg";

import { db } from "../firebase";
import { Article, Highlight } from "../types/Article";
import { User } from "../types/User";

export function getUpdatedArticles(
  user: User,
  articles: Article[],
  articleDocID: string,
  highlights: Highlight[]
): Article[] {
  return articles.map((article) => {
    if (article.articleDocID === articleDocID) {
      updateDoc(doc(db, `users/${user.docID}/articles/${articleDocID}`), {
        ...article,
        highlights,
      });
      return { ...article, highlights };
    } else {
      return article;
    }
  });
}

export function getPicture(index: number) {
  const pictures = [
    img0,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ];
  return pictures[index];
}
