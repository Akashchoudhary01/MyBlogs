import { Router } from "express";
import multer from "multer";
import { BLOG } from "../Models/blogModels.js";
import path from "path";

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
    console.log(blog);
    
   return  res.render("blog" , {
    user : req.user,
    blog
   });

})
