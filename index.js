import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import {router} from './Routes/userRoute.js'
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

//express middleware to handleform data
app.use(express.urlencoded({extended :true}));

app.set('view engine' , 'ejs');
app.set('views' , path.resolve('./Views'));


app.use(express.json());

app.get("/" , (req , res) =>{
    res.render("Home");
})
app.use('/user' , router);

app.listen(PORT , ()=>{
    console.log(`App is Listning on http://localhost:${PORT}`);
    
})
