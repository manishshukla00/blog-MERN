import express from "express";
import mongoose from "mongoose";

mongoose
  .connect("mongodb+srv://mern-blog:mern@mern-blog.ywiyggn.mongodb.net/blog")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.listen(5000, () => {
  console.log("Server is listening at 5000");
});
