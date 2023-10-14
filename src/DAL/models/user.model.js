import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:String
    },
    password:{
        type:String,
        required:true},
    isAdmin:{
        type:String,
        required:true,
        default:"user" 
    },
    githubLog:{
        type:Boolean,
        requireed:true,
        default:false 
    },
    cart:{
        type:String,
    }
});

export const userModel = mongoose.model('user',userSchema)