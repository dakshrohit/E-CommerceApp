import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";  

const getUserProfile = asyncHandler(async(req,res)=>{
    const userid=req.user?._id;
    if(!userid){
        throw new ApiError(400,"User not found");
    }
    const user = await User.findById(userid).select("-password -refreshToken");
    if(!user){
        throw new ApiError(404,"User not found");
    }

    return res.status(200)
    .json(new ApiResponse(200,user,"User profile fetched successfully"));   
    




})

export { getUserProfile };