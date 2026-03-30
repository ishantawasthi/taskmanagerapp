
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({

     title:{
        type:String,
        required:true
     },

     description:{
        type:String,
        required:true
     },
        status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
        },

  //  ID of the user who created the task
        user:{
        type:mongoose.Schema.Types.ObjectId,  // This is a reference to the User model
        ref:"User",
        required:true
     }
        
},{timestamps:true});

const Task=mongoose.model("Task",TaskSchema);
export default Task