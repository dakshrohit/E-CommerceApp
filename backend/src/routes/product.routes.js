import {createProduct,getallproducts,getProductsById,deleteProduct,updateProduct,getMyProducts} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import express from "express";
import { isSeller } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create").post(verifyJWT, isSeller, createProduct);
router.route("/update/:id").put(verifyJWT, isSeller, updateProduct); // PUT api/products/update/:id
router.route("/delete/:id").delete(verifyJWT, isSeller, deleteProduct);
router.route("/my-products").get(verifyJWT, isSeller, getMyProducts); // GET api/products/my-products
router.route("/:id").get(getProductsById); // Keep this at the END!
router.route("/").get(getallproducts);     // Also safe at the end

export {router as productRouter};


// Note: The order of routes matters. The more specific routes should be defined before the more general ones.
// always define the static routes at the end of the file to avoid conflicts with dynamic routes as express matches the first route that fits.

