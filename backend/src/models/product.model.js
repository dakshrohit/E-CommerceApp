import mongoose from "mongoose";
import {User} from "./user.model.js";
delete mongoose.connection.models['Product'];

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Product title is required"],
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
        default:0,
        min:0,
        
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required:true
    }
},{
    timestamps:true
})
const Product = mongoose.model("Product", productSchema);
export {Product};