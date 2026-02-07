import { Router } from "express";
import { BLOG } from "../Models/blogModels.js";

export const blogRouter = Router();

blogRouter.get("/addBlog", (req, res) => {
  return res.render("addBlog", {
    user: req.user
  });
});
blogRouter.post("/addBlog", async (req, res) => {
  const {title , body} = req.body;
  const newblog = await BLOG.create({
    title,
    body
  })
  return res.redirect("/");
});
