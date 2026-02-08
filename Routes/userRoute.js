import { Router } from "express";
import { USER } from "../Models/userModels.js";

export const router = Router();

router.get("/signin" , (req , res)=>{
   return  res.render("signin" , {
    error : null
   })
})
router.get("/signup" , (req , res)=>{
   return  res.render("signup", {
    error : null
   }
   )
})
//logout
router.get("/logout" , (req , res)=>{
   res.clearCookie('token').redirect("/");
})

router.post("/signin" , async (req , res)=>{

    const {email , password} = req.body;
    try {
         const token = await USER.matchPasswordAndGenerateToken(email , password);
    // console.log(token);
     return res.cookie('token', token).redirect("/");
    } catch (error) {
        res.render("signin" , {
            error : "Invalid Credintial"
        })
        
    }
   
     
     
    
})
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    await USER.create({
      fullName,
      email,
      password,
    });

    return res.redirect("/user/signin");

  } catch (error) {

    // console.log(error); // For debugging

    return res.render("signup", {
      error: "Email already exists or something went wrong"
    });
  }
});
