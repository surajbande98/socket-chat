const express = require("express");

const { body } = require("express-validator/check");

const router = express.Router();

const postController = require("../controllers/post");

const isAuth = require("../middlewares/is-auth");

router.put(
  "/create",
  isAuth,
  [
    body("post")
      .trim()
      .not()
      .isEmpty()
  ],
  postController.createPost
);

router.get("/posts", isAuth, postController.getPosts);

router.put(
  "/comment/create/:id",
  isAuth,
  [
    body("comment")
      .trim()
      .not()
      .isEmpty()
  ],
  postController.createComment
);

router.delete(
  "/delete/:id",
  isAuth,
  postController.deletePost
);

module.exports = router;
