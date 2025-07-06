import mongoose from "mongoose";
const cartitemschema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product", 
        required:true

    },
    quantity:{
        type:Number,
        default:1,
        min:1

    }
},{timestamps:true});


const cartschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    items:[cartitemschema],
    updatedAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

export const Cart=mongoose.model("Cart",cartschema);