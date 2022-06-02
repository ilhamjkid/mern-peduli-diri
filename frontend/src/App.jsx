import { useEffect } from "react";
import Cookies from "js-cookie";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, getUser } from "./features/users/userSlice";
import Home from "./pages/Home";
import Note from "./pages/Note";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loading from "./components/Loading";

const App = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    initTheme();

    if (Cookies.get("aflog") && !user) {
      dispatch(getUser());
    }

    dispatch(reset());
  }, [user, dispatch]);

  const initTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme || currentTheme === "light") {
      document.querySelector("html").classList.add("light");
      document.querySelector("html").classList.remove("dark");
    } else if (currentTheme === "dark") {
      document.querySelector("html").classList.add("dark");
      document.querySelector("html").classList.remove("light");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="notes" element={<Note />} />
      <Route path="notes/create" element={<Create />} />
      <Route path="notes/update/:id" element={<Update />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default App;
