import { validateToken } from "../Services/authintication.js";

export const checkForAuthintication= (cookieName)=>{
    return (req  , res , next)=>{
        const tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue) {
            return next();
        }
        try{
            const userPaylode = validateToken(tokenCookieValue);
            req.user = userPaylode;

        }catch(err){}
       return   next();
    }

}