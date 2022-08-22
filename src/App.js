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
import Signup from "./pages/SignUp/Signup";
import ForgotPassword from "./pages/ForgotPass/Forgot";
import Dashboard from "./components/Dashboard.jsx";

import { AuthProvider } from "./contexts/authContext";

function App() {
  const [users, setUsers] = useState();
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const userSnapshot = await getDocs(usersCollectionRef);
      const usersList = userSnapshot.docs.map((doc) => doc.data());
      // console.log(usersList);
    };

    getUsers();
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
