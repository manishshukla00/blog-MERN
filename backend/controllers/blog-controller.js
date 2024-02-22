import mongoose from "mongoose";
import User from "../model/User.js";
import Blog from "../model/blog.js";

export const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    return console.log(error);
  }
};

export const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Unable To Find User With This Id" });
    }
  } catch (error) {
    console.log(error);
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
    session.endSession();
    return res
      .status(200)
      .json({ message: "Blog Created Successfully", existingUser, blog });
  } catch (error) {
    return console.log(error);
  }
};

export const updateBlog = async (req, res) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, { title, description });
    if (!blog) {
      return res.status(500).json({ message: "Unable To Update The Blog" });
    }
    return res.status(200).json({ message: "Blog Updated Successfully", blog });
  } catch (error) {
    return console.log(error);
  }
};

export const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const blogs = await Blog.findById(id);
    if (!blogs) {
      return res.status(404).json({ message: "No Blog Found With This id" });
    }
    return res.status(200).json({ message: "All Blog with This id", blogs });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    if (!blog) {
      return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const userBlog = async (req, res) => {
  const userId = req.params.id;
  try {
    const userBlog = await User.findById(userId).populate("blogs");
    if (!userBlog) {
      return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json(userBlog);
  } catch (error) {
    console.log(error);
  }
};
