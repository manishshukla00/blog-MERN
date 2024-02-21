import express from "express";
import { addBlog, getAllBlog } from "../controllers/blog-controller.js";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlog);
blogRouter.post("/add", addBlog);

export default blogRouter;
