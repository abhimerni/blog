const Category = require("../model/category.model");
const cloudinary = require("cloudinary").v2;

module.exports = {
  newCategory: async (req, res) => {
    const { title } = req.body;
    try {
      const newCategory = new Category({ title });
      const saveCategory = await newCategory.save();
      res.status(200).json(saveCategory);
    } catch (error) {
      res.status(500).json({ error, message: "something error happens" });
    }
  },

  getAllCategory: async (req, res) => {
    try {
      const allCategory = await Category.find();
      res.status(200).json(allCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCategorys: async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: "Course is deleted successfully...", category });
    } catch (error) {}
  },
  editCategorys: async (req, res) => {
    try {
      const { catID, title } = req.body;

      const category = await Category.findByIdAndUpdate(
        catID,
        {
          $set: { title: title },
        },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Course is edited successfully...", category });
    } catch (error) {}
  },
};
