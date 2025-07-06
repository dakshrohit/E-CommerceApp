import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    address: { type: String },
    apartment: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    phone: { type: String },
    country: { 
        type: String,
    default: "India" 
    },
  },
  { timestamps: true }
);

export { addressSchema };
