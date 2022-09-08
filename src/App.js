import { useEffect, useState } from "react";
import { db } from "./utils/firebase";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import store from "./Store";
import { getProject } from "./actions/productAction";
import { getUser } from "./actions/userAction";
import { useDispatch } from "react-redux";

// Pages
import Signup from "./pages/SignUp/Signup";
import ForgotPassword from "./pages/ForgotPass/Forgot";
import Dashboard from "./components/Dashboard.jsx";
import Loading from "./components/Loading";
import Home from "./pages/Home/Home";

// Contexts
import { AuthProvider } from "./contexts/authContext";

function App() {
  const [users, setUsers] = useState();
  const usersCollectionRef = collection(db, "users");
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      const userSnapshot = await getDocs(usersCollectionRef);
      const usersList = userSnapshot.docs.map((doc) => doc.data());
      // console.log(usersList);
    };

    getUsers();
  }, []);

  useEffect(() => {
    dispatch(getProject());
    dispatch(getUser());
  });

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/loading" element={<Loading />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
