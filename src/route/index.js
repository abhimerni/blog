const router = require("express").Router();
const auth = require("../controller/auth.controller");
const post = require("../controller/post.controller");
const category = require("../controller/category.controller");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken.middleware");

//auth
router.post("/auth/register", auth.register);
router.post("/auth/login", auth.login);

// category
router.get("/category/all", category.getAllCategory);
router.post("/category/add", verifyTokenAndAdmin, category.newCategory);
router.delete("/category/:id", verifyTokenAndAdmin, category.deleteCategorys);
router.post("/category/edit", verifyTokenAndAdmin, category.editCategorys);

//posts
router.post("/post/new", verifyTokenAndAdmin, post.createNewPost);
router.post("/post/all", post.getAllPosts);
router.get("/post/:id", post.getPostById);
router.delete("/post/:id", verifyTokenAndAdmin, post.deletePost);

module.exports = router;
