import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios
      .get(`https://blog-mern-39f5.onrender.com/api/blogs/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => {
          console.log(blog._id);
          return (
            <Blog
              isUser={localStorage.getItem("userId") === blog.user}
              id={blog._id}
              key={index}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.image}
              username={blog.user.username}
            />
          );
        })}
    </div>
  );
};

export default UserBlogs;
