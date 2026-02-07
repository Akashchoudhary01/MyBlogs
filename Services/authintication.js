import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

export const createTokenForUser = (user)=>{
    const payload = {
        _id : user._id,
        email : user.email,
         profileImgURL: user. profileImgURL,
         role : user.role,
          fullName: user.fullName,
    };
    const token = JWT.sign(payload , secret , {
        expiresIn :'24h'
    })
    return token;
}

export const validateToken = (token)=>{
    const payload = JWT.verify(token , secret);
    return payload;
}