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
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    await blog.save();
    return res.status(200).json({ message: "Blog Created Successfully", blog });
  } catch (error) {
    console.log(error);
  }
};
