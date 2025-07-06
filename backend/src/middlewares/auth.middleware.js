import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {  
    try{

        const token= req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");
        if(!token){
            throw new ApiError(401, "Unauthorized request, please login again");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user=await User.findById(decodedToken?._id).select("-password  -refeshToken");
        if(!user){
            throw new ApiError(401, "Unauthorized request, please login again");
        }
        req.user=user; //attaching the user to the request object
        next(); //calling the next middleware or controller

    } catch(error){
        console.error("JWT verification error:", error);
        throw new ApiError(402, error.message || "Unauthorized, please login again");
    }
})

const isSeller=asyncHandler(async(req,res,next)=>{
    if(req.user?.role ==="seller"){ // i have access to req.user because of the verifyJWT middleware
        next();
    }
    else{
        return res.status(403).json({
            status:403,
            message:"Access denied, you are not authorized to perform this action. Seller only route"
        })
    }
})


const isAdmin=asyncHandler(async(req,res,next)=>{
    if(req.user?.role ==="admin"){
        next();
    }
    else{
        return res.status(403).json({
            status:403,
            message:"Access denied, you are not authorized to perform this action. Admin only route"
        })
    }
})  

export {isSeller,isAdmin};