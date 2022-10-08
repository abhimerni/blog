const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, username } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: username,
        email: email,
        password: hashPass,
      });
      const user = await newUser.save();
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .json({ ...rest, token, message: "User register successfully." });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(400).json("Wrong");

      const validatePass = await bcrypt.compare(req.body.password, user.password);
      !validatePass && res.status(400).json("Wrong Password");
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      const { password, ...rest } = user._doc;
      res
        .status(200)
        .json({ ...rest, token, message: "User login successfully." });
    } catch (error) {
      res.status(500).json({ message: "Any thing wrong happen", error });
    }
  },
};
