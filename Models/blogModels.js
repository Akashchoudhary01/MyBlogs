import mongoose, { model , Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,

  },

  body: {
    type: String,
    required: true,

    
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
