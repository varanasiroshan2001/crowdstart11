import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute, AdminRoute } from "./utils/PrivateRoute";
import "./App.css";
import { getProject } from "./actions/projectAction";
import { getUser } from "./actions/userAction";
import { useDispatch } from "react-redux";

// Pages
import Signup from "./pages/SignUp/Signup";
import ForgotPassword from "./pages/ForgotPass/Forgot";
import Loading from "./components/Loading/Loading";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import SubmitProject from "./pages/SubmitProject/SubmitProject";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import NewRequest from "./pages/NewRequest/NewRequest";
import Requests from "./pages/Requests/Requests";

// Contexts
import { useAuth } from "./contexts/authContext";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  // console.log(currentUser);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const userSnapshot = await getDocs(usersCollectionRef);
  //     const usersList = userSnapshot.docs.map((doc) => doc.data());
  //     // console.log(usersList);
  //   };

  //   getUsers();
  // }, []);

  useEffect(() => {
    dispatch(getProject());
    if (currentUser) dispatch(getUser(currentUser));
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/project/:id" element={<ProjectDetails />} />

          {/* Private Routes */}
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="submit-project"
            element={
              <PrivateRoute>
                <SubmitProject />
              </PrivateRoute>
            }
          />
          <Route
            path="/project/:id/requests"
            element={
              <PrivateRoute>
                <Requests />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="project/:id/new-request"
            element={
              <PrivateRoute>
                <NewRequest />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
