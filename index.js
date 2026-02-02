import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3004;
const app = express();

app.set('view engine' , 'ejs');
app.set('views' , path.resolve('./Views'));


app.use(express.json());

app.get("/" , (req , res) =>{
    res.render("Home");
})

app.listen(PORT , ()=>{
    console.log(`App is Listning on http://localhost:${PORT}`);
    
})
