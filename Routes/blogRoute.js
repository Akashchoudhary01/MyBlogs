import { Router } from "express";
import multer from "multer";
import { BLOG } from "../Models/blogModels.js";
import path from "path";
import { COMMENT } from "../Models/comments.js";

//multer uplode
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}- ${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export const blogRouter = Router();

blogRouter.get("/addBlog", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});
blogRouter.post("/addBlog", upload.single("coverImg"), async (req, res) => {
    const imagePath = `/uploads/${req.file.filename}`;
  const { title, body } = req.body;
  const newblog = await BLOG.create({
    coverImg: imagePath,
    title,
    createdBy: req.user._id,
    body,
  });
  return res.redirect("/");
});

//
blogRouter.get("/:id" , async(req , res)=>{
    const blog = await BLOG.findById(req.params.id).populate("createdBy");
    const comments = await COMMENT.find({blogId :req.params.id }).populate("createdBy");
    
    
   return  res.render("blog" , {
    user : req.user,
    blog,
    comments
   });

})


//Routes for Comment

blogRouter.post("/comment/:blogId", async (req, res) => {

  if (!req.user) {
    return res.redirect("/user/signin");
  }

  await COMMENT.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});
