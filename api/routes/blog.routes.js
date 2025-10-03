import express from "express";
import dotenv from "dotenv";
import blogModel from "../../models/blog.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await blogModel.find();
  if (!data) {
    return res.status(404).json({ message: "No Blogs" });
  }
  res.json(data);
});

router.post("/", async (req, res) => {
  const { title, content, author, image, categories } = req.body;
  const data = {
    title: title,
    author: author,
    content: content,
    image: image,
    categories: categories,
  };
  console.log(categories);
  try {
    await blogModel.insertMany(data).then((res) => {
      console.log("Data inserted: " + res);
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested blog id:", id);
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export { router };
