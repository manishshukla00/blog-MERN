import express from "express";
import router from "./routes/user-routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", router);
app.use("/api/blogs", blogRouter);

app.listen(5000, () => {
  console.log("Server is listening at 5000");
});
