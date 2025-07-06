// loginUser,logoutUser,signupUser
import {User} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
const generateAccessAndRefreshTokens = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};
const signupUser = asyncHandler(async (req, res) => {
  const { email, role = "buyer", fullName, password, confPassword } = req.body;

  //basic validation

  if (!email || !fullName || !password || !confPassword) {
    throw new ApiError(400, "All fields are required");
  }

  //checking if passw===confpasw
  if (password !== confPassword) {
    throw new ApiError(400, "Password and confirm password do not match");
  }

  //checking if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { fullName }],
  });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email or fullname");
  }

  //creating user
  const newUser = await User.create({
    fullName: fullName,
    email,
    password,
    role,
  });

  //generating access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    newUser._id
  );

  //removing password,refreshtoken from response
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  const options = {
    httpOnly: true,
    // secure: true,
    secure: process.env.NODE_ENV === "production", // Set secure flag only in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  };

  //returning the response

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //destructuring the request body
  const { email, password, role = "buyer" } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  //checking if user exists
  const user = await User.findOne(
    { email }
  ).select("+password"); //selecting password field to compare later

  if (!user) {
    throw new ApiError(404, "User not found with this email or full name");
  }
  //checking if the user is trying to access seller routes
  if (req.originalUrl.includes("/seller") && user.role !== "seller") {
    throw new ApiError(403, "Access denied: Not a seller account");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect password");
  }
  //generating access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  //removing password,refreshtoken from response
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!loggedInUser) {
    throw new ApiError(500, "Something went wrong while logging in user");
  }
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  };
  //returning the response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      // secure: true,
      // sameSite: "strict",
    })
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken; //getting the refresh token from cookies or request body
  if (!incomingRefreshToken) {
    throw new ApiError(400, "Unauthorized, please login again");
  } //encoded token received from client

  //verifying the refresh token and checking if it has matching refreshtokensecret
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    ); //decoded token
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token, please login again");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(
        401,
        "Refresh token is invalid or used, please login again"
      );
    }

    //if everything is fine, generate new access and refresh tokens
    const options = {
      httpOnly: true,
      // secure: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag only in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Invalid refresh token, please login again",
      [],
      error?.stack
    );
  }
});


const getCurrentUser=asyncHandler(async(req,res)=>{
  const userId=req.user?._id;
  if(!userId){
    throw new ApiError(400, "User not found");
  }
  const user=await User.findById(userId).select("-password -refreshToken");
  if(!user){
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(
    new ApiResponse(200,user,"User fetched successfully")
  )
})

export { signupUser, loginUser, getCurrentUser,logoutUser, refreshAccessToken };
