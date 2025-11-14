import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/token.js";

export const handleSignup = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"all fields are reqeuired"});
        }

        if(password.length < 6 )return res.status(400).json({message:"password must be atleast 6 chars"});

        const user = await User.findOne({email});
        if(user)return res.status(400).json({message:"user already exists"});

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
        })

        if(newUser){
            generateToken(newUser._id,res);
            return res.status(200).json({user});
        }else{
            return res.status(400).json({message:"error creating new user"});

        }
            

    }catch(error){
        console.log("error in auth controller signup", error.message);
        return res.status(400).json({message:"error creating user"});
    }
}


export const handleLogin = async(req,res)=>{
    try{

        const {email, password} = req.body;
        if( !email || !password){
            res.status(400).json({message:"all fields are reqeuired"});
        }

        const user = await User.findOne({email});
        if(!user)res.status(400).json({message:"No user exists"});

        const isSame = await bcrypt.compare(password,user.password);
        if(isSame){
            generateToken(user._id,res)
            return res.status(200).json({message:"logging successfull"});
        }else{
            return res.status(400).json({message:"Invalid credentials"});
        }

    }catch(error){
        console.log("error in login in auth controller", error.message);
        return res.status(400).json({message:"error logging in"});
    }

}


export const handleLogout = (req,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out successfully"});
}