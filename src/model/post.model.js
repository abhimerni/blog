const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Posts", postSchema);
