import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  console.log(blogs);

  const sendRequest = async () => {
    const res = await axios
      .get("https://blog-mern-39f5.onrender.com/api/blogs")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => {
          return (
            <Blog
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
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

export default Blogs;
