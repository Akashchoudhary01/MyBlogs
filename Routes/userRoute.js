import { Router } from "express";
import { USER } from "../Models/userModels.js";

export const router = Router();

router.get("/signin" , (req , res)=>{
   return  res.render("signin")
})
router.get("/signup" , (req , res)=>{
   return  res.render("signup")
})
router.post("/signin" , async (req , res)=>{
    const {email , password} = req.body;
    const user = await USER.matchPassword(email , password);
    console.log(user);
     return res.redirect("/");
    
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