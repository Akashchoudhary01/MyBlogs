import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import cookieParser from 'cookie-parser';
import {router} from './Routes/userRoute.js'
import {blogRouter} from './Routes/blogRoute.js'
import { checkForAuthintication } from './Middleware/authMiddleware.js';
import { BLOG } from './Models/blogModels.js';
dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌", err);
  });

const PORT = process.env.PORT || 3004;
const app = express();

//Middlewares
//express middleware to handleform data
app.use(express.urlencoded({extended :true}));
//cookiePareser middleware
app.use(cookieParser());
app.use(checkForAuthintication("token"));

app.set('view engine' , 'ejs');
app.set('views' , path.resolve('./Views'));


app.use(express.json());
app.use(express.static(path.resolve('./public')));

app.get("/" ,async (req , res) =>{
  const allBlogs = await BLOG.find({})
    res.render("Home" , {
      user : req.user,
      blogs : allBlogs
    });
})

//route
app.use('/user' , router);
app.use('/blog' , blogRouter);

app.listen(PORT , ()=>{
    console.log(`App is Listning on http://localhost:${PORT}`);
    
})
