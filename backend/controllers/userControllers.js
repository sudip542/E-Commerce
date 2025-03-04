import userModel from '../models/userModel.js'
import  validator from 'validator'
import bycrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const createToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

//Route for user login
const loginUser =async (req,res)=>{
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email});

        if(!user){
            return res.json({succes:false, message:"User not exists!"});
        }

        const isMatch=await bycrypt.compare(password,user.password);
        if (isMatch) {
            const token =createToken(user._id);
            res.json({succes:true,token});
        }
        else{
            return res.json({succes:false, message:"Password not Match!"});
        }
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message});
    }
}

//Route for user Registration
const registerUser= async (req,res)=>{
    try {
        const {name,email,password}=req.body;

        //chicking  user already exists or not
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({succes:false, message:"User already exists!"});
        }
        //validating email and password
        if (!validator.isEmail(email)) {
            return res.json({succes:false, message:"Please enter a valid email !"});
        }
        if(password.length<8){
            return res.json({succes:false, message:"Please Enter a strong password !"});
        }
        //hashing user password
        const salt= await bycrypt.genSalt(10);
        const hashedPassword= await bycrypt.hash(password,salt);

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword,
        })

        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({succes:true,token});

    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message});
    }
}

//Route for Admin login
const adminLogin =async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET_KEY);
            res.json({succes:true,token});
        }
        else{
            res.json({succes:false,message:"invalid email or password"});
        }
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message});
    }
}

export {loginUser,registerUser,adminLogin};