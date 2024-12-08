import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { useAuthContext } from "./Context/AuthContext.jsx";
import SearchResCode from "./pages/SearchResCode.jsx";
import ListsOfResCode from "./pages/ListsOfResCode.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { authUser, setAuthUser } = useAuthContext();

  const verify = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/me`,
        { headers: { token: JSON.parse(localStorage.getItem("token")) } }
      );
      setAuthUser(res.data.userName);
    } catch (error) {
      localStorage.removeItem("token");
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/search" /> : <Signup />}
        ></Route>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/search" /> : <Login />}
        ></Route>
        <Route
          path="/search"
          element={authUser ? <SearchResCode /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/lists"
          element={authUser ? <ListsOfResCode /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/*"
          element={
            authUser ? <Navigate to="/search" /> : <Navigate to="/login" />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
