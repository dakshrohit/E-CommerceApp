import express from "express";
import {addToCart,getCart,clearCart,removeFromCart,updateCart} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.use(verifyJWT)

router.get("/",getCart); // Get cart items // GET /api/cart
router.post("/add",addToCart);// Add item to cart // POST /api/cart/add
router.post("/update",updateCart);// Update item quantity in cart // POST /api/cart/update
router.delete("/clear",clearCart);// Clear cart // DELETE /api/cart/clear
router.route("/remove/:productId").delete(removeFromCart); // Remove item from cart by productId // DELETE /api/cart/remove/:productId
export {router as cartRouter};