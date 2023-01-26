const router = require("express").Router();
const Blog = require("../models/blog.model");

router.route("/").get((req, res) => {
  Blog.find()
    .then((blogs) => res.json(blogs))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const newBlog = new Blog({ title, content });

  newBlog
    .save()
    .then(() => res.json("New Blog added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
