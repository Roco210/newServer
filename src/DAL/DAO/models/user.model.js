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
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
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
        default:"user",
        enum:["user","premium","admin"]
    },
    githubLog:{
        type:Boolean,
        requireed:true,
        default:false 
    },
    cartId:{
        default:"null",
        type:String,
        requireed:true
    }
});

export const userModel = mongoose.model('user',userSchema)