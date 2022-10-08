const Post = require("../model/post.model");
const cloudinary = require("cloudinary").v2;

module.exports = {
  createNewPost: async (req, res) => {
    const { title, desc, category } = req.body;
    const file = req.files.image;
    try {
      if (!file) return res.status(400).json("No image in request");
      const cloudi = await cloudinary.uploader.upload(file.tempFilePath);
      const newPost = await new Post({
        title: title,
        desc: desc,
        category: category,
        imageUrl: cloudi.url,
      });
      const savePost = await newPost.save();
      res
        .status(200)
        .json({ message: "New post created successfully", savePost });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllPosts: async (req, res) => {
    const { catId } = req.body;
    try {
      const allPost = catId
        ? await Post.find({ category: catId }).populate("category")
        : await Post.find().sort({ createdAt: -1 }).populate("category");
      res.status(200).json(allPost);
    } catch (error) {
      res.status(500).json({ message: "Something error happen", error });
    }
  },

  deletePost: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await Post.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: "Course is deleted successfully...", post });
    } catch (error) {
      res.status(500).json({ message: "Something error happen", error });
    }
  },
  getPostById: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await Post.findById(id).populate("category");
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Something error happen", error });
    }
  },
};
