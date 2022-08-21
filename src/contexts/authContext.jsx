import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../utils/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
        console.log(user);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  const updateEmail = (email) => {
    updateProfile(auth.currentUser, email);
  };

  const updatePassword = (password) => {
    updatePassword(auth.currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
