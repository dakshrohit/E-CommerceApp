import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/order.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";

const placeOrder=asyncHandler(async(req,res)=>{
    const userId=req.user?._id;
    if(!userId){
        throw new ApiError(400,"User not found");
    }
    const{products,shippingAddress,totalAmount,mode,paymentMethod}=req.body;
    if(!products || !shippingAddress || !totalAmount || !mode || !paymentMethod){
        throw new ApiError(400,"All fields are required");
    }

    //validate products
    // const productIds=products.map(product=> product.productId? product.productId:product._id); // extracting product IDs from the products array
    // const existingProducts=await Product.find(
    //     {_id:{
    //         $in:productIds // checking if the product IDs exist in the database in the products array
    //     }}
    // )
    // if(existingProducts.length !== productIds.length){
    //     throw new ApiError(404,"Some products not found");
    // }
    // //check stock availability
    // for(const product of products){
    //     const existingProduct=existingProducts.find(p=>p._id.toString()=== product.productId.toString()

    // );


    // }

    //validate products
    for(const product of products){
        const productdetailsindb=await Product.findById(product.productId);
        if(!productdetailsindb){
            throw new ApiError(404,`Product with ID ${product.productId} not found`);
        }
        // check if quantity given is valid
        if(product.quantity<1){
            throw new ApiError(400,`Invalid quantity for product ${productdetailsindb.title}`);
        }
        // check if product is in stock
        if(product.quantity>productdetailsindb.stock){
            throw new ApiError(400,`Insufficient stock for product ${productdetailsindb.title}`);
        }
        // deduct stock from product
        productdetailsindb.stock=productdetailsindb.stock-product.quantity;
        await productdetailsindb.save({
            validateBeforeSave:false
        });


    }
    // create order
    const orderdoc=await Order.create({
        user:userId,
        products,
        shippingInfo:shippingAddress,
        totalAmount,
        mode,
        paymentMethod

    })

    if(!orderdoc){
        throw new ApiError(500,"Order could not be placed");
    }
    //clear cart if mode is CART
    if(mode==="CART"){
        const cart=await Cart.findOneAndDelete({
            user:userId
        })
        


    }
    return res.status(201).json(
        new ApiResponse(201, orderdoc, "Order placed successfully"
    ))


})

const getUserOrders=asyncHandler(async(req,res)=>{
    
    const userId=req.user?._id
    if(!userId){
        throw new ApiError(400,"User not found");
    }
    const userOrders=await Order.find({
        user:userId
    }).populate("products.productId","title price image")   // Populate product details in the order
    .populate("user","name email") // Populate user details in the order
    .sort({
        createdAt:-1 // Sort by creation date in descending order
    })
    if(!userOrders || userOrders.length === 0){
        return res.status(404).json(
            new ApiResponse(404, [], "No orders found for this user")
        )
    }
    return res.status(200).json(
        new ApiResponse(200, userOrders, "User orders fetched successfully")    
    )
})

export { placeOrder, getUserOrders };