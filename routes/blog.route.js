const express = require("express");

const blogControllers = require("../controllers/blog.controller");

const router = express.Router();

router
  .route("/blog/post")
  .post(blogControllers.createBlog)
  .get(blogControllers.getBlog);

router
  .route("/blog/:id")
  .get(blogControllers.singeBlog)
  .delete(blogControllers.deleteBlog);

module.exports = router;
