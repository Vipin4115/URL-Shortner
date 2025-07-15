import wrapAsync from "../utils/TryCatchWrapper.js";
import { registerUser,loginUser } from "../services/auth.services.js";
import {cookieOptions} from "../config/config.js"

export const register_user= wrapAsync(async(req,res) =>{
    const {name,email,password} = req.body;
    const {token,user} = await registerUser(name,email,password)
    req.user=user
    res.cookie("accessToken", token,cookieOptions);
    res.status(200).json({message:"register success"})
})

export const login_user = wrapAsync(async(req,res) =>{
    console.log(req.body);
    const {email,password} = req.body;
    const {token,user} = await loginUser(email,password)
    req.user=user
    res.cookie("accessToken", token,cookieOptions);
    res.status(200).json({user:user,message:"login success"})
})

export const logout_user = wrapAsync( async (req, res) => {
    res.clearCookie("accessToken", cookieOptions)
    res.status(200).json({message:"logout success"})
})

export const get_current_user = wrapAsync( async (req, res) => {
    res.status(200).json({user:req.user})
})