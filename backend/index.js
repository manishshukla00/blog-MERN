import express from "express";
import router from "./routes/user-routes.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb+srv://mern-blog:mern@mern-blog.ywiyggn.mongodb.net/blog")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", router);

app.listen(5000, () => {
  console.log("Server is listening at 5000");
});
