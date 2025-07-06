//addToCart,getCart,clearCart,removeFromCart,updateCart

import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { productId, quantity = 1 } = req.body;
  //validating input
  if (!productId) {
    throw new ApiError(400, "Product ID is required!");
  }
  //check if product exists in db
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found!");
  }
  if(product.stock<quantity){
    throw new ApiError(400, "Insufficient stock for this product!");
  }

  // find the existing user's cart
  let cart = await Cart.findOne({
    user: userId,
  });
  if (!cart) {
    //creating a new cart if it doesnt exist
    cart = await Cart.create({
      user: userId,
      items: [{ productId, quantity }],
    });
  } else {

    const existingItem = cart.items.find((item) => item.productId.toString() === productId.toString());
    if(existingItem){
        existingItem.quantity += quantity; //if item already exists in cart, increase the quantity
        await cart.save();
    } else{
        cart.items.push({ productId, quantity });
    cart.updatedAt = Date.now();
    await cart.save();

    }
    
  }
  return res.status(200).json(
    new ApiResponse(200,cart,"Product added to cart successfully ")
  )
});

const getCart = asyncHandler(async (req, res) => {
    const userId=req.user?._id;
    if(!userId){
        throw new ApiError(400,"User not found");
    }
    const cart = await Cart.findOne({
        user:userId
    }).populate("items.productId") //populate product details in cart items
    if(!cart || cart.items.length ===0){
        return res.status(200).json(
            new ApiResponse(200,{items:[]}, "Cart is empty")
        )

    }
    return res.status(200).json(
        new ApiResponse(200,cart,"Cart fetched successfully")
    )
})

const updateCartItem=asyncHandler(async(req,res)=>{
    const userId=req.user?._id;
    const{productId,quantity}=req.body;
    if(!userId){
        throw new ApiError(400,"User not found");
    }
    if(!productId || quantity<1){
        throw new ApiError(400,"Invalid input");
    }
    const cart=await Cart.findOne({
        user:userId
    })
    if(!cart){
        throw new ApiError(404,"Cart not found");
    } 
      
    const item=cart.items.find((item)=>{
        return item.productId.toString()=== productId.toString();
    })//find the item in cart by productId

    if(!item){
        throw new ApiError(404,"Item not found in cart");
    }
    const product=await Product.findById(productId);

    if(!product || product.stock <quantity){
        
        throw new ApiError(400, "Insufficient stock for this product!");
    }
    item.quantity=quantity;
    await cart.save(
        {validateBeforeSave:false} //to skip validation for quantity
    )
    res.status(200).json(
        new ApiResponse(200,cart,"Cart item updated successfully")
    )
})

const removeFromCart=asyncHandler(async(req,res)=>{
    const userId=req.user?._id;
    const productid=req.params.productId;
    const cart=await Cart.findOne({
        user:userId
    })
    if(!cart){
        throw new ApiError(404,"Cart not found");
    }
    cart.items=cart.items.filter((item)=>{
        return item.productId.toString()!==productid.toString();
    })
    await cart.save();
    res.status(200).json(
        new ApiResponse(200,cart,"Item removed from cart successfully")
    )   

})
const clearCart=asyncHandler(async(req,res)=>{
    const updatedCart=await Cart.findOneAndUpdate(
        {user:req.user?._id},//find cart by user id
        {$set:{items:[]}},
        {new:true} //return the updated cart 

    );
    res.status(200).json(
        new ApiResponse(200,updatedCart, "Cart cleared successfully")
    )
})

export {addToCart, getCart, updateCartItem as updateCart,removeFromCart, clearCart};