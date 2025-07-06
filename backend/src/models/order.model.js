import mongoose from "mongoose";
const orderschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index:true
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    shippingInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      apartment: { type: String }, // optional
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true, default: "India" },
    },
    totalAmount: {
      type: Number, 
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    mode: {
      type: String,
      enum: ["CART", "BUY_NOW"],
      default: "CART",
    },
    paymentMethod:{
        type:String,
        enum:["Cash on Delivery", "UPI", "Card", "Net Banking"],
        default:"Cash on Delivery",
        required:true
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderschema);
export { Order };
