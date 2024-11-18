import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    profilePhoto : {
        type : String,
        required : true,
        default : "",
    },
    gender : {
        type : String,
        enum : ["male", "female"],
        required : true,
    },

}, {timestamps:true})

export  const User = mongoose.model("User", userModel);