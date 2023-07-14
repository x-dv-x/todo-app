import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

  export const createNewUser = async (req,res,next)=>{
  try {
    const {name,email,password} = req.body;
    let user = await User.findOne({ email });
    if(user) return next(new ErrorHandler("Choose something unique",400));
    const hashedPass = await bcrypt.hash(password,10);
    user = await User.create({name, email, password: hashedPass,})
    sendCookie(user,res,"Registered Successfully",201);
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        if(!user) return next(new ErrorHandler("Invalid email or Password",400));

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return next(new ErrorHandler("Invalid email or Password",400));

        sendCookie(user, res, `Welcome back ${user.name}`,200);

    } catch (error) {
        next(error);
    }
};


export const userDetails = (req,res)=>{
    res.status(200).json({
        success: true,
        user: req.user,
    })
}

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,})
    .json({
        success: true,
    })
}