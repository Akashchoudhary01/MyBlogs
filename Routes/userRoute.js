import { Router } from "express";
import { USER } from "../Models/userModels";

export const router = Router();

router.get("/signin" , (req , res)=>{
   return  req.render(signin)
})
router.get("/signup" , (req , res)=>{
   return  req.render(signup)
})
router.post("/signup" , async (req , res)=>{
   const {fullName , email , password } = req.body;
   try {
    
       await USER.create({
        fullName,
        email,
        password,
       })
       return req.redirect("/");
   } catch (error) {
    return req.redirect(signup) 
   }

   

})