import mongoose from "mongoose";

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
    profileImg :{
        type : String,
        default : '/public/images/default.png'
    },

})