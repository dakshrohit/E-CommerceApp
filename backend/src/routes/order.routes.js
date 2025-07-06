import { placeOrder,getUserOrders } from "../controllers/order.controller.js";
import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/").post(verifyJWT, placeOrder); // Place an order // POST /api/orders
router.route("/user").get(verifyJWT, getUserOrders); // Get all orders for the authenticated user
export { router as orderRouter };