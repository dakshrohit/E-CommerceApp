import express from "express";
import {getUserProfile} from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/profile").get(verifyJWT,getUserProfile); // GET request for user profile //GET /api/user/profile
export {router as userRouter};