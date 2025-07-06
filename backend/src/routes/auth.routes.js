import express from "express";
import {loginUser,logoutUser,
    getCurrentUser,
    signupUser,refreshAccessToken} from "../controllers/auth.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"; 
const router =express.Router();



router.route("/signup").post(signupUser); // POST request for signup //POST /api/auth/signup
router.route("/login").post(loginUser); // POST request for login  // POST /api/auth/login
router.route("/logout").post(verifyJWT,logoutUser); // GET request for logout  // POST /api/auth/logout
router.route("/refresh-token").post(refreshAccessToken); // GET request for refreshing access token  // POST /api/aut/refresh-token
router.route("/me").get(verifyJWT,getCurrentUser); // GET request for getting current user details  // GET /api/auth/me
export {router as authRouter};