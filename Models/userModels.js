import mongoose, { model } from "mongoose";
import {createHmac  , randomBytes} from 'crypto';

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

// Pre-save Hook
userSchema.pre("save", async function () {
  // If password not changed, do nothing
  if (!this.isModified("password")) return;

  // Generate salt
  const salt = randomBytes(16).toString("hex");

  // Hash password
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  // Save hashed values
  this.salt = salt;
  this.password = hashedPassword;
});
export const USER = model("user" , userSchema);
