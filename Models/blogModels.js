import mongoose, { model , Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: [30, "Title should be less than 30 characters"],
  },

  body: {
    type: String,
    required: true,
    minLength: [5, "Blog should be at least 5 characters"],
    
  },

  coverImg :{
    type : String,

  },

  createdBy:{
    type : Schema.Types.ObjectId,
    ref : 'user'
  }
} , {
    timestamps : true
});

export const BLOG = model("blog" , blogSchema);
