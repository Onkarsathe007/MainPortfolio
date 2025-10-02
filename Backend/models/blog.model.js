import mongoose from "mongoose";
const schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  image: { type: String },
  categories: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const blogModel = mongoose.model("blog", blogSchema);
export default blogModel;
