import { Router } from "express";
import multer from "multer";
import path from "path";

import { BLOG } from "../Models/blogModels.js";
import { COMMENT } from "../Models/comments.js";

export const blogRouter = Router();

/* ===============================
   MULTER CONFIG
================================ */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },

  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});


/* ===============================
   ADD BLOG - GET
================================ */

blogRouter.get("/addBlog", (req, res) => {

  if (!req.user) {
    return res.redirect("/user/signin");
  }

  res.render("addBlog", {
    user: req.user,
    error: null,
  });
});


/* ===============================
   ADD BLOG - POST
================================ */

blogRouter.post(
  "/addBlog",
  upload.single("coverImg"),
  async (req, res) => {

    if (!req.user) {
      return res.redirect("/user/signin");
    }

    try {

      // Check image
      if (!req.file) {
        return res.render("addBlog", {
          user: req.user,
          error: "Please upload an image",
        });
      }

      const { title, body } = req.body;

      // Validate fields
      if (!title || !body) {
        return res.render("addBlog", {
          user: req.user,
          error: "All fields are required",
        });
      }

      const imagePath = `/uploads/${req.file.filename}`;

      await BLOG.create({
        coverImg: imagePath,
        title,
        body,
        createdBy: req.user._id,
      });

      return res.redirect("/");

    } catch (error) {

      console.log("ADD BLOG ERROR:", error);

      return res.render("addBlog", {
        user: req.user,
        error: "Failed to create blog. Try again.",
      });
    }
  }
);


/* ===============================
   VIEW SINGLE BLOG
================================ */

blogRouter.get("/:id", async (req, res) => {

  try {

    const blog = await BLOG
      .findById(req.params.id)
      .populate("createdBy");

    if (!blog) {
      return res.redirect("/");
    }

    const comments = await COMMENT
      .find({ blogId: req.params.id })
      .populate("createdBy");

    res.render("blog", {
      user: req.user,
      blog,
      comments,
    });

  } catch (error) {

    console.log("BLOG VIEW ERROR:", error);

    return res.redirect("/");
  }
});


/* ===============================
   ADD COMMENT
================================ */

blogRouter.post("/comment/:blogId", async (req, res) => {

  if (!req.user) {
    return res.redirect("/user/signin");
  }

  try {

    if (!req.body.content) {
      return res.redirect(`/blog/${req.params.blogId}`);
    }

    await COMMENT.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });

    return res.redirect(`/blog/${req.params.blogId}`);

  } catch (error) {

    console.log("COMMENT ERROR:", error);

    return res.redirect(`/blog/${req.params.blogId}`);
  }
});
