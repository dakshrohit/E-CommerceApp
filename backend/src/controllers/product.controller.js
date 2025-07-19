import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const createProduct = asyncHandler(async(req,res)=>{
    console.log("Product body:", req.body);

    const {title, stock,description,content,image,price}=req.body;
    console.log("Type of stock:", typeof stock, stock);

    if(!title || !description || !image || !stock || !price){
        throw new ApiError(400,"All fields are required");
    }
    const product=await Product.create({
        title,description,content,image,price,stock,
        createdBy:req.user?._id // assuming req.user is populated with the authenticated user's info
    })
    if(!product){
        throw new ApiError(500,"Product creation failed");
    }   
    return res.status(201).json(
        new ApiResponse(201,product,"Product created successfully")
    )   

})

const getallproducts=asyncHandler(async(req,res)=>{
    const products= await Product.find({});// Fetch all products from the database
    if(!products || products.length === 0){
        throw new ApiError(404,"No products found");
    }
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            products,
            "Products fetched successfully"
        )
    
    )

})


const getProductsById = asyncHandler(async (req, res) => {
    const products = await Product.findById({
        _id:req.params.id
        
    })
    
    

    if(!products || products.length === 0){
        throw new ApiError(404,"Product not found");
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            products,
            "Products fetched successfully"   ))        
})
const deleteProduct=asyncHandler(async(req,res)=>{
    const productId=req.params.id;
    if(!productId){
        throw new ApiError(400,"Product ID is required");
    }
    const product=await Product.findByIdAndDelete(productId);
    if(!product){
        throw new ApiError(404,"Product not found");
    }
    if(product.createdBy.toString()!==req.user?._id.toString()){
        throw new ApiError(403,"You are not authorized to delete this product");
    }
    return res.status(200).json(
        new ApiResponse(200,{},`Product with ID ${productId} deleted successfully`)
    )
})

const updateProduct=asyncHandler(async(req,res)=>{
    const productId=req.params.id;
    if(!productId){
        throw new ApiError(400,"Product ID is required");
    }
    const {title, stock,description,content,image,price}=req.body;
    if(!title || !description || !image || !stock || !price){
        throw new ApiError(400,"All fields are required");
    }
    const product=await Product.findByIdAndUpdate(productId,{
        title,description,content,image,price,
        createdBy:req.user?._id // assuming req.user is populated with the authenticated user's info
    },{new:true})
    if(!product){
        throw new ApiError(500,"Product update failed");
    }   
    if(product.createdBy.toString()!==req.user?._id.toString()){
        throw new ApiError(403,"You are not authorized to delete this product");
    }
    return res.status(200).json(
        new ApiResponse(200,product,"Product updated successfully")
    )   

})

const getMyProducts=asyncHandler(async(req,res)=>{
    const userId=req.user?._id;
    if(!userId){
        throw new ApiError(400,"User not found");
    }
    const sellerProducts=await Product.find({
        createdBy:userId

    })

    return res.status(200).json(
        new ApiResponse(200,sellerProducts,"Seller products fetched successfully")
    )   
})

export {createProduct,getallproducts,getProductsById,updateProduct,deleteProduct,getMyProducts};