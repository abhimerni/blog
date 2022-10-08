const Banner = require("../model/banner.model");
const cloudinary = require("cloudinary").v2;

module.exports = {
  newBanner: async (req, res) => {
    const { title } = req.body;
    const file = req.files.image;

    try {
      if (!file) return res.status(400).json("No image in request");
      const cloudi = await cloudinary.uploader.upload(file.tempFilePath);

      const newBanner = new Banner({
        title: title,
        imageUrl: cloudi.url,
      });
      const saveBanner = await newBanner.save();
      res
        .status(200)
        .json({ message: "New Banner created successfully", saveBanner });
    } catch (error) {
      res.status(500).json({ message: "Something error happen", error });
    }
  },
  getAllBanners: async (req, res) => {
    const query = req.query.new;
    try {
      const allCourse = (await query)
        ? await Banner.find().sort({ _id: -1 }).limit(5)
        : await Banner.find();
      res.status(200).json(allCourse);
    } catch (error) {
      res.status(500).json({ message: "Something error happen", error });
    }
  },
  deleteBanners: async (req, res) => {
    try {
      const id = req.params.id;
      const course = await Banner.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: "Course is deleted successfully...", course });
    } catch (error) {}
  },
};
