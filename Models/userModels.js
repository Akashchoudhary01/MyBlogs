import mongoose, { model } from "mongoose";
import {createHmac  , rendomBytes} from 'crypto';

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
        minLength : [3 , "Name Should minimum 3 Char" ],
        maxLength : [30 , "Name Should maximum 30 Char" ],

    },
    email :{
        type : String,
         required : true,
         unique : true
    },
    salt :{
        type : String,
        require : true,
    },
    password :{
        type : String,
        require : true,
    },
    profileImgURL :{
        type : String,
        default : '/public/images/default.png'
    },
    role:{
        type:String,
        enum :[ "USER" ,"ADMIN"],
        default : "USER"
    }

},{
    timestamps : true
});


userSchema.pre('save' , function(next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = rendomBytes(16).toString();
    const hashedPassword = createHmac("sha256" , salt)
    .update(user.password)
    .digest("hex")
    
    this.salt = salt;
    this.password = hashedPassword;
    next();

})
export const USER = model("user" , userSchema);
