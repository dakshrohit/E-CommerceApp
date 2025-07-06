import { asyncHandler } from "../utils/asyncHandler.js";

const createPaymentLink = asyncHandler(async (req, res) => {
  const { totalAmount, fullName, email, phone } = req.body;
  const userId = req.user?._id;
  if (!totalAmount || !userId || !email || !phone || !fullName) {
    return res.status(400).json({
      status: 400,
      message: "Total amount and user ID are required",
    });
  }
  const axios = require("axios");
  try{
  const axiosInstance = await axios({
    method: "post",
    url: process.env.INSTAMOJO_BASE_URL + "payment-requests/",

    data: {
      amount: totalAmount.toFixed(2), // ensuring amount is a number with two decimal places
      purpose: "Order Payment",
      buyer_name: fullName,
      email: email,
      redirect_url: `${process.env.CLIENT_URL}/payment/success`, // URL to redirect after payment success after online payment
      webhook_url:`${process.env.CLIENT_URL}/api/orders/webhook`, // URL to receive webhook notifications 
      send_email: true,
      send_sms: true,
    },
    headers: {
      "X-Api-Key": process.env.INSTAMOJO_API_KEY,
      "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    timeout: 5000,
    responseType: "json",
  })
  if (axiosInstance.data.success) {
        const paymentLink = axiosInstance.data.payment_request.longurl;
        return res.status(200).json({
          status: 200,
          message: "Payment link created successfully",
          data: {
            paymentLink,
          },
        });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Failed to create payment link",
        });
      }
    } catch(error){
        console.error("Error creating payment link:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
})

const instamojoWebhook= asyncHandler(async(req,res)=>{
    const {payment_id,
        payment_request_id,
        payment_status,
        buyer_name,
        amount,
        email,
        phone,
    } = req.body;
    // if(payment_status !== "credit"){
    //     return res.status(400).json({
    //         status:400,
    //         message:"Payment not successful",
        
    //     })

    //     try{
    //         if()

    //     }catch(error){

    //     }
        
        
    // }
    });

export { createPaymentLink };

