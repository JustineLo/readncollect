import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
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
  );
}

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmitTest}>
//         <label htmlFor="url">URL</label>
//         <input
//           type="text"
//           value={newUrl}
//           onChange={(e) => setNewUrl(e.target.value)}
//         />
//         <button type="submit">Submit ARTICLE</button>
//       </form>
//       <div>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     </div>
//   );
// }

export default Home;
