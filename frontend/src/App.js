import React, { useEffect } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import AddBlog from "./components/AddBlog";
import BlogDetail from "./components/BlogDetail";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "./store";

const App = () => {
  const isLogedIn = useSelector((state) => state.isLogedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        {isLogedIn && (
          <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/add" element={<AddBlog />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
