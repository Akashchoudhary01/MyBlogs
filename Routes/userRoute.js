import { Router } from "express";
import { USER } from "../Models/userModels.js";

export const router = Router();

router.get("/signin" , (req , res)=>{
   return  res.render("signin")
})
router.get("/signup" , (req , res)=>{
   return  res.render("signup")
})
router.post("/signup" , async (req , res)=>{
   const {fullName , email , password } = req.body;
   try {
    
       await USER.create({
        fullName,
        email,
        password,
       })
       return res.redirect("/");
   } catch (error) {
    console.log(error);
    
    return res.redirect("/user/signup") 
   }

   

})