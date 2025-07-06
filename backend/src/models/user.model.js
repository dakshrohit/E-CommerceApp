import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import validator from 'validator';
import { addressSchema } from './address.model.js';
import jwt from 'jsonwebtoken';


const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"User name is required"],
        trim:true, 
        maxlength:[35,"User name cannot exceed 35 characters"]  

    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        validate:[validator.isEmail,"Please enter a valid email address"], //using validator library to validate email
        
    },
    password:{
        type:String,
        required:[true,"Password is required!"],
        minLength:[8,"Password must be at least 8 characters long"],
        select:false, //to not return password in queries
    },
    role:{
        type:String,
        enum:["buyer","seller","admin"],
        default:"buyer"
    },
    address:{
        type:[addressSchema], // Using the Address schema defined in address.model.js
        default:[],
    },
    refreshToken:{
        type:String,
    }

},{timestamps:true});

// hashing the pwd before saving using a pre-save hook

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password= await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password, this.password);
    
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullName:this.fullName,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullName:this.fullName,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
const User=mongoose.model("User",userSchema);
export {User};