import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const register = async(req, res) =>{
    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body;
        if(!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({success : false, message : "All fields Required!"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({success:false, message:"Password Doesn't Match"});
        }
    
        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({success:false, message : "User Already Exists"});
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Generate profile Pictures
        const maleProfile = "https://avatar.iran.liara.run/public/boy";
        const femaleProfile = "https://avatar.iran.liara.run/public/girl"; 
    
        await  User.create({
            fullName,
            userName,
            password:hashedPassword,
            profilePhoto : gender === "male" ? maleProfile : femaleProfile,
            gender,
        })
    
        return res.status(200).json({success:true, message : "User Registered Successfully!"})
    } catch (error) {
        console.log(error);
        
    }

}

export const login = async(req,res) => {
    try {
        const {userName, password} = req.body;
        if(!userName || !password) {
            console.log("Username & Password Required!");            
        }

        const user = await User.findOne({userName});
        if(!user){
            return res.status(400).json({success:false, message:"User Not Found!"});
        }
        const isValidPass = await bcrypt.compare(password, user.password);
        if(!isValidPass){
            return res.status(400).json({success:false, message:"Invalid Credentials"});
        }
        const tokenData = {
            userId : user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn : "1d"});
        res.status(200).cookie("token", token, {maxAge : 1*24*60*60*100, httpOnly : true}).json({
            success : true,
            message : "Login Successfully",
            user : {_id : user._id,
            username : user.userName,
            fullname : user.fullName,
            profilePhoto : user.profilePhoto}
        })


        // return res.status(200).json({message:true, success:"Login Successfull!"});
    } catch (error) {
        console.log("Error In Login ", error);
        
    }
}


export const logout = (req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged Out Successfully!"
        });
        
    } catch (error) {
        console.log("Error in Logout : ", error);
        
    }
}

export const getOtherUser = async(req,res) => {
    try {
        const loggedInUser = req.id;
        const otherUsers = await User.find({_id:{ $ne: loggedInUser }}).select("-password");
        return res.status(200).json(otherUsers)
    } catch (error) {
        console.log("Error in getOtherUser", error);
        
    }
}