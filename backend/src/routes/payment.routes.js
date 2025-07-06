import { createPaymentLink } from "../controllers/payment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import express from "express";
const router = express.Router();

router.route("/create").post(verifyJWT, createPaymentLink); // Create payment link // POST /api/payment/create
export { router as paymentRouter };